import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Button, TouchableOpacity, Dimensions } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import { RenderHTML } from 'react-native-render-html';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const is7InchTablet = width >= 600 && width <= 800 && height >= 800 && height <= 1200;

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./../assets/load.gif')} style={{ height: 60, width: 60 }} accessibilityLabel="Load" />
        </View>
    );
};
const EventDetail = () => {
    const route = useRoute();
    const { eventId } = route.params || {};
    const [events, setEvents] = useState();
    const { height, width } = useWindowDimensions();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    useEffect(() => {
        
        const fetchPostDetails = async () => {
            setLoading(true);
            try {
               
                const [postsResponse] = await Promise.all([
                    axios.get(`https://opengovasia.com/wp-json/wp/v2/fat-event/${eventId}/?_embed`),
                ]);
                setEvents(postsResponse.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }

        };

        fetchPostDetails();
    }, [eventId]);


    if (!events) {
        return null; // Or show a loading indicator
    }
   

    const site = "https://opengovasia.com";


    const customHTMLElementModels = {
        form: {
            contentModel: 'block', // Set the content model to 'block' or 'mixed' depending on your needs
        },
    };
    const ignoredDomTags = ['form'];
  

    

    const onElement = (node, index, parent, domTree) => {
        if (node.name === 'img' && node.attribs.src) {
            const imageSource = node.attribs.src.startsWith('/') ? `${site}${node.attribs.src}` : node.attribs.src;
            node.attribs.src = imageSource;

            // Add alt attribute to the image node
            if (!node.attribs.alt) {
                node.attribs.alt = ''; // Add a descriptive text for the alt attribute
            }
        }
        return node;
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <View>
            <View style={styles.viewButton}>
                <View style={styles.clickButton}>
                    <TouchableOpacity onPress={() => navigation.navigate('Events')}>
                        {/* Your back button icon or text here */}
                        <Image source={require('./../assets/back.png')} style={{ width: 17, height: 28 }} accessibilityLabel="Back" />
                    </TouchableOpacity>

                </View>
                <View style={styles.logAlign}>
                    <Image source={require('./../assets/logo.png')} style={styles.logo} />
                </View>
            </View>
        <ScrollView>
            <View>

                {/* <Button title="Go to Preview" onPress={() => navigation.navigate('Event')} /> */}

            </View>
            <View style={styles.container}>
                {/* <Text style={styles.title}>{events.title.rendered}</Text> */}
                <View>
                        {events._embedded['wp:featuredmedia'][0]?.source_url ? (
                            <Image
                                source={{ uri: site + events._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }}
                                style={styles.fullImage} accessibilityLabel="{events.title.rendered }"
                            />
                        ) : (
                                <Image style={styles.fullImage} />
                        )}
                    
                </View>
                <View style={styles.htmlContent}>
                    <RenderHTML
                        source={{ html: events.content.rendered }}
                        contentWidth={width}
                        customHTMLElementModels={customHTMLElementModels}
                        ignoredDomTags={ignoredDomTags} tagsStyles={tagsStyles} classesStyles={classesStyles}
                            domVisitors={{ onElement }}
                    />
                    </View>
            </View>
        </ScrollView>
        </View>
    );
};

export default EventDetail;

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
        paddingBottom:150,
        paddingTop: 45 // For IOS
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
    ImageSize: {
        width: 100,
        height: 100
    },
    fullImage: {
        height: MIN_HEIGHT,
        marginBottom: 15,
        borderRadius: 3
    },
    subtext: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: font,
        color: '#A5A5A4',
        marginRight: 5
    },
    viewButton: {
        height: 55,
        width: '100%',
        top:35,    //For Ios
        // top: 0,  // For Android
        zIndex: 1,
        backgroundColor: '#fff',
        paddingTop: 5,
        borderColor: '#d9d9d9',
        borderBottomWidth: 1,
    },
    clickButton: {
        width: 30,
        height: 34,
        marginLeft: 15,
        marginTop: 5,
        paddingLeft: 6,
        paddingRight: 6,
    }, 
    htmlContent:{
        paddingRight:20
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
const tagsStyles = {
    p: {
        lineHeight: 22,
        padding:0,
        margin:0,
        marginBottom: 12,
        fontSize:16,
       
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        padding:0,
        marginBottom: 8,
        
    },
    img: {
        width: '100%',
        marginBottom: 10,
        borderRadius: 8,
    },
    // Add styles for other HTML tags as needed
};
const classesStyles = {
    'swiper-slide': {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        width: '31%',
        height:85,
        borderColor:'#6EC1E4',
        borderWidth:1,
        marginRight:7,
        marginBottom:8,
        fontSize:10
    },
    'swiper-wrapper': {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    'elementor-testimonial__text':{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:5,
        paddingRight: 5,
        fontSize:10,
    },
    'elementor-swiper-button-prev':{
        display:'none'
    },
    'elementor-swiper-button-next': {
        display: 'none'
    },
    'elementor-row':{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    'has_eae_slider img':{
      width:150 
    },
    'elementor-col-25': {
        width: '100%',
    },
    'attachment-medium': {
        width:340,
        height:400,
        
    }
    

     
};



