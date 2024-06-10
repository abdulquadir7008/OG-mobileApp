import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Button, TouchableOpacity, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Speech from 'expo-speech';

const { width, height } = Dimensions.get('window');
const is7InchTablet = width >= 600 && width <= 800 && height >= 800 && height <= 1200;

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./../assets/load.gif')} style={{ height: 60, width: 60 }} accessibilityLabel="Load" />
        </View>
    );
};
const PostDetail = () => {
    const route = useRoute();
    const { postId } = route.params || {};
    const [post, setPost] = useState();
    const [media, setMedia] = useState([]);
    const [author, setAuthorData] = useState([]);
    const textStyles = [{ display: 'flex', marginBottom:10 }, { flexDirection: 'row' }];
    const { height, width } = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

    useEffect(() => {
        // Fetch the post details and author information from the WordPress REST API
        const fetchPostDetails = async () => {
            setLoading(true);
            try {
                const [postsResponse, mediaResponse] = await Promise.all([
                    axios.get(`https://opengovasia.com/wp-json/wp/v2/posts/${postId}/?_embed`),
                    axios.get(`https://opengovasia.com/wp-json/wp/v2/media?parent=${postId}&_fields=id,source_url`),
                ]);
                const postData = postsResponse.data;
                const mediaData = mediaResponse.data;

                // Extract authorId from postData
                const authorId = postData.author;

                setPost(postData);
                setMedia(mediaData);

                // Fetch author information based on authorId
                axios.get(`https://opengovasia.com/wp-json/wp/v2/users/${authorId}`)
                    .then(authorResponse => {
                        const authorData = authorResponse.data;
                        setAuthorData(authorData);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error(error);
                        setLoading(false);
                    });
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [postId]);

    
    const stopAudio = async () => {
        try {
            await Speech.stop();
            setCurrentChunkIndex(0); // Reset to the first chunk
            setIsPlaying(false);
        } catch (error) {
            console.error('Error stopping audio:', error);
        }
    };
    useEffect(() => {
        // Clean up audio when component unmounts
        return () => {
            stopAudio();
        };
    }, []);



    const handlePlayPause = async () => {
        // console.log('Play button pressed');
        if (!post || !post.content || !post.content.rendered) {
            return; // Do nothing if post is not available yet
        }

        try {
            const textToSpeak = post.content.rendered;
            const maxChunkLength = 4000;
            const chunks = [];

            const lettersAndNumbersText = textToSpeak.replace(/<[^>]+>/g, '');
            const cleanText = lettersAndNumbersText.replace(/[^a-zA-Z0-9. ]/g, ''); 
            for (let i = 0; i < cleanText.length; i += maxChunkLength) {
                chunks.push(cleanText.slice(i, i + maxChunkLength));
            }

            if (isPlaying) {
                
                await Speech.stop();
                setCurrentChunkIndex(0); // Reset to the first chunk
                setIsPlaying(false);
            } else {
                // Start or resume playback
                for (let i = currentChunkIndex; i < chunks.length; i++) {
                    if (i !== currentChunkIndex) {
                        setCurrentChunkIndex(i);
                    }

                    await Speech.speak(chunks[i], { rate: 0.75 });

                    // Wait for 1 second between chunks to simulate pause
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            }

            setIsPlaying(!isPlaying); // Toggle between play and pause
        } catch (error) {
            console.error('Text-to-speech error:', error);
            setIsPlaying(false);
        }
    };



    

    if (!post || !media || !author) {
        return null; // Or show a loading indicator
    }
    if (loading) {
        return <Loader />;
    }
    const site = "https://opengovasia.com";
    const postCreated = new Date(post.date).toDateString();
    const decodedData = post.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
    
    const renderPlayPauseButton = () => {
        if (!post) {
            return <Loader />; // Show a loading indicator while post is being fetched
        }

        return (
            <TouchableOpacity onPress={handlePlayPause} style={styles.audioButton}>
                {isPlaying ?
                    <Image source={require('./../assets/stop.png')} style={{ height: 20, width: 16 }} accessibilityLabel="Stop Playback" /> 
                 :
                    <Image source={require('./../assets/play.png')} style={{ height: 20, width: 16 }} accessibilityLabel="Start Playback" /> 
                 }
            </TouchableOpacity>
        );
    };


    return (
      <View>
            <View style={styles.viewButton}>
                <View style={styles.clickButton}>
                    <TouchableOpacity onPress={() => {
                        stopAudio();
                        navigation.navigate('Articles')
                    }}>
                        {/* Your back button icon or text here */}
                        <Image source={require('./../assets/back.png')} style={{ width: 17, height: 28 }} accessibilityLabel="Back" />
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.logAlign}>
                    <Image source={require('./../assets/logo.png')} style={styles.logo} />
                </View>
            </View>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>{decodedData}</Text>
                    <View style={textStyles}>

                        <Text style={styles.subtext}>{postCreated}</Text>
                        <Text style={styles.subtext}>{'-'}</Text>
                        <Text style={styles.subtext}>{author.name}</Text>
                    </View>
                    <View>
                        {post._embedded['wp:featuredmedia'][0]?.source_url ? (
                            <Image
                                source={{ uri: site + post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }}
                                style={styles.fullImage}
                            />
                        ) : (
                                <Image style={styles.fullImage} accessibilityLabel="{decodedData}" />
                        )}

                        
                    </View>
                    
                    
                    
                    <HTML source={{ html: post.content.rendered }} contentWidth={width} tagsStyles={htmlStyles} />

                </View>
            </ScrollView>
            <View style={styles.playButtonContainer}>{renderPlayPauseButton()}</View>
        </View>
    );
};

export default PostDetail;

let MIN_HEIGHT;
if (is7InchTablet) {
    MIN_HEIGHT = 400; // Value for 7-inch tablet

} else {
    MIN_HEIGHT = 300; // Value for other screens

}

const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor:'#fff',
        paddingBottom:150,
        paddingTop:45 // For IOS
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
    },
    ImageSize:{
        width:100,
        height:100
    },
    fullImage:{
        height: MIN_HEIGHT,
        marginBottom: 15,
        borderRadius: 3
    },
    subtext: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: font,
        color: '#333',
        marginRight: 5
    },
    viewButton:{ 
        height:55,
        width:'100%',
        top:35,    //For Ios
        // top:0,  // For Android
        zIndex:1,
        backgroundColor:'#fff',
        paddingTop:5,
        borderColor: '#d9d9d9',
        borderBottomWidth: 1,
    },
    clickButton:{
        width:30,
        height:30,
        marginLeft:15,
        marginTop:5,
        paddingLeft:6,
        paddingRight: 6
    }, 
    audioButton: {
        backgroundColor: 'blue',
        padding: 12,
        borderRadius: 30,
        alignContent:'center',
        paddingLeft:14,
        paddingRight:14,
        width:44,
        height:44
    },
    audioButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    playButtonContainer: {
        position: 'absolute',
        bottom: 60,
        left:20,
        width: '100%',
        backgroundColor: 'transparent', // Set your background color
        alignItems: 'flex-start', // Align items to the start (left)
        zIndex: 1, // Ensure it's above other content
    },
    logAlign: {
        backgroundColor: '#0b4596',
        position: 'absolute',
        width: 60,
        height: 45,
        right: 0,
        // top:35, //For IOS
        top: 4, //for android
        alignItems: 'center',
        zIndex: 100
    },
    logo: {
        width: 37,
        height: 37,
        resizeMode: 'contain',
        backgroundColor: '#0b4596',
        marginTop: 4
    },
   
});
const htmlStyles = {
    p: {
        fontSize: 16,
        lineHeight:22,
    },
};


