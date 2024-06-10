import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Platform, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
const screenHeight = Dimensions.get('window').height;
const scrollHeightPercentage = 45;
const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/load.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};
const ScrollLoader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/Ellipsis.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};
const OGTVScreen = () => {
    const [ogTV, setogTv] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const [firstPost, setFirstPost] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    
  
    useEffect(() => {
        fetchData(currentPage);
    }, []);

    const fetchData = async (page) => {
        setIsFetching(true);
        try {
            const response = await fetch(
                `https://opengovasia.com/wp-json/wp/v2/ogtv-video-custom/?page=${page}&_embed`
            );
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                setHasMorePages(true);
                if (currentPage === 1) {
                    setFirstPost(data[0]);
                }
                setogTv((prevEvents) => [...prevEvents, ...data]);
            } else {
                setHasMorePages(false);
            }
            setIsFetching(false);
        } catch (error) {
            console.error(error);
            setIsFetching(false);
        }
    };



    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
        if (isEndReached && !isFetching && hasMorePages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchData(nextPage);
        }
    };

    
    const navigation = useNavigation();
    const handlePostPress = (ogtvId) => {
        const selectedPost = ogTV.find((ogtv) => ogtv.id === ogtvId);
        setFirstPost(selectedPost); // Update the firstPost data when a video list item is clicked
        setSelectedItemId(ogtvId); // Set the selected item ID
        navigation.navigate('OpenGov TV', { ogtvId });
    };
    

    if (isFetching && currentPage === 1) {
        // If still fetching the initial data, show Loader
        return <Loader />;
    }

    return (
        <View style={styles.container}>
            
            {firstPost && firstPost.meta && firstPost.meta.video_url && (
                <View style={styles.videoDetailContiner}>
                    <WebView
                        source={{ uri: firstPost.meta.video_url }}
                        style={styles.videoPlayer} 
                        allowsInlineMediaPlayback={true}
                        mediaPlaybackRequiresUserAction={false}
                        allowsFullscreenVideo={true} 
                    />
                    <Text style={styles.videoDetailsTitle}>
                        {firstPost.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}
                    </Text>
                </View>
            )}
        
        <ScrollView horizontal={false} scrollEventThrottle={400} // Adjust the threshold as needed
                onScroll={handleScroll} style={{ height: (screenHeight * scrollHeightPercentage) / 100 }}>
            <View style={styles.viewContent}>

               
                {ogTV
                   
                    .map((ogtv, index) => ( // Add index as the second part of the key

                        <TouchableHighlight
                            onPress={() => handlePostPress(ogtv.id)}
                            underlayColor="#DDD"
                            key={`${ogtv.id}-${index}`}
                            accessibilityLabel={`OpenGov TV Fireside Chat: ${ogtv.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}`}
                            style={[
                                selectedItemId === ogtv.id ? styles.selectedItem : null,
                            ]}
                        >
                            <View style={styles.videoContiner}>
                                <View style={styles.youtubeImage}>
                                    <Image source={require('../assets/yutubeicon.png')} style={{ height: 40, width: 40 }} />
                                </View>
                                <Text style={styles.videoTitle}>{ogtv.title.rendered.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))}</Text>
                            </View>
                        </TouchableHighlight>

                    ))}

                </View>
            </ScrollView>

            {isFetching && currentPage === 1 && <Loader />}
            {isFetching && currentPage > 1 && (
                <View style={styles.loaderContainer}>
                    <ScrollLoader />
                </View>
            )}
        </View>
    );
};

export default OGTVScreen;

const MIN_HEIGHT = 250;
const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
const styles = StyleSheet.create({
    videoPlayer: {
        height: 80,
        marginBottom: 10,
        width: '100%',
    },
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    videoDetailContiner:{
        width:'100%',
        height:300,
        marginBottom:30
    },
    videoTitle: {
        fontSize: 16,
        fontWeight: 'normal',
        width: '70%',
        paddingLeft: 10
    },
    videoContiner: {
        flexDirection: 'row',
        padding: 5,
        width:'100%',
        borderColor: '#eaebec',
        borderBottomWidth: 1,
        paddingTop:15,
        paddingBottom:15
    },
    videoDetailsTitle:{
        fontWeight:'bold',
        fontSize: 17,
        padding:10,
        borderColor:'#cbcbcb',
        borderBottomWidth:1,
        paddingTop:5
    },
    viewContent:{
        backgroundColor:'#fff',
        marginBottom: 20,
    },
    container:{
        backgroundColor: '#fff',
        height:'100%'
    },
    selectedItem: {
        backgroundColor: '#DDD', // Customize the selected background color here
    },
    youtubeImage:{
        width:'30%',
        height:60,
        padding:10,
        backgroundColor:'#dedfe1',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
    }

});