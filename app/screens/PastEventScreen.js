import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Platform, ScrollView, TouchableHighlight, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

const { width, height } = Dimensions.get('window');
const is7InchTablet = width >= 600 && width <= 800 && height >= 800 && height <= 1200;

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
const PastEventScreen = () => {
    const route = useRoute();
    const { pastEventId } = route.params || {};
    const [events, setEvents] = useState([]);
    const [isFetching, setIsFetching] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const site = "https://opengovasia.com";
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    

    const fetchInitialData = () => {
        fetchData(currentPage);
    };

    useEffect(() => {
        // Clear the events state when pastEventId changes
        setEvents([]);
        setCurrentPage(1);
        setHasMorePages(true);
        fetchInitialData(); // Fetch data for the selected year
    }, [pastEventId]);

    const fetchData = async (page) => {
        if (page === 1) {
            setIsFetching(true); // Fetching initial data
        } else {
            setIsFetchingMore(true); // Fetching more data
        }

        try {
            const response = await fetch(
                `https://opengovasia.com/wp-json/wp/v2/fat-event/?page=${page}&_embed&per_page=20&year=${pastEventId}`
            );
            const data = await response.json();

            if (!Array.isArray(data)) {
                setIsFetching(false);
                setIsFetchingMore(false);
                return;
            }
            const filteredEvents = data.filter(
                (event) => event.start_date && event.start_date !== ''
            );
            const sortedEvents = sortEventsByStartDate(filteredEvents);

            if (sortedEvents.length === 0) {
                setHasMorePages(false);
            }

            if (page === 1) {
                // If it's the first page, clear existing events
                setEvents(sortedEvents);
            } else {
                // If it's not the first page, append to existing events
                setEvents((prevEvents) => [...prevEvents, ...sortedEvents]);
            }

            if (page === 1) {
                setIsFetching(false); // Done fetching initial data
            } else {
                setIsFetchingMore(false); // Done fetching more data
            }
        } catch (error) {
            console.error(error);
            setIsFetching(false);
            setIsFetchingMore(false);
        }
    };

    useEffect(() => {
        return () => {
            setEvents([]);
            setCurrentPage(1);
            setHasMorePages(true);
        };
    }, []);

    const isUpcomingEvent = (startDate) => {
        const currentDate = moment().startOf('day');
        const eventStartDate = moment(startDate, 'YYYY/MM/DD').startOf('day');
        return eventStartDate >= currentDate;
    };
    const sortEventsByStartDate = (events) => {
        return events.sort((a, b) => {
            const dateA = moment(a.start_date, 'YYYY/MM/DD').startOf('day');
            const dateB = moment(b.start_date, 'YYYY/MM/DD').startOf('day');
            return dateB - dateA;
        });
    };
   
    const getTimeFromDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('/');
        const [hour, minute] = timePart.split(':');

        const date = new Date(year, month - 1, day, hour, minute);
        const formattedTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        return formattedTime;
    };
   
    const formatDate = (dateString) => {
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('/');
        const [hours, minutes] = timePart.split(':');

        const date = new Date(year, month - 1, day, hours, minutes);

        if (isNaN(date)) {
            return ''; // Return an empty string if the date is invalid
        }

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    };

    const navigation = useNavigation();
    const handlePostPress = (eventId) => {
        navigation.navigate('PastEventDetail', { eventId, pastEventId });
    };
    const handleScroll = (event) => {
        // Calculate if the user has scrolled to the end of the content
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50; // Adjust the threshold value if needed

        if (isEndReached && !isFetchingMore && hasMorePages) {
            // Fetch more data when the user reaches the end
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchData(nextPage);
        }
    };

    
    if (isFetching && currentPage === 1) {
        // If still fetching the initial data, show Loader
        return <Loader />;
    }
    return (
        <View>
            <View style={styles.viewButton}>
                <View style={styles.clickButton}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Events')
                    }}>
                        {/* Your back button icon or text here */}
                        <Image source={require('./../assets/back.png')} style={{ width: 17, height: 28 }} accessibilityLabel="Back" />
                    </TouchableOpacity>

                </View>
                <View style={styles.logAlign}>
                    <Image source={require('./../assets/logo.png')} style={styles.logo} />
                </View>
            </View>
        <ScrollView
            horizontal={false}
            scrollEventThrottle={400}
            onScroll={handleScroll}
        >
            <View style={styles.viewContent}>
                <Text style={styles.headingTittle}>Past Events: {pastEventId}</Text>
                
                {events
                    .filter((event) => !isUpcomingEvent(event.start_date)) // Filter out upcoming events
                    .map((event, index) => (
                        <TouchableHighlight
                            style={[styles.imageWrapper]}
                            onPress={() => handlePostPress(event.id)}
                            underlayColor="#DDD"
                            key={`${event.id}-${index}`}
                        >
                            <View style={styles.eventlistDetails}>
                                <View style={styles.eventList}>
                                    {event._embedded['wp:featuredmedia'][0]?.source_url ? (
                                        <Image
                                            style={styles.eventListImage}
                                            source={{
                                                uri: site + event._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url,
                                            }}
                                        />
                                    ) : (
                                        <Image style={styles.eventListImage} />
                                    )}

                                    <View style={styles.eventContentDetails}>
                                        <Text style={styles.eventListTitle}>{event.title.rendered}</Text>
                                    </View>
                                </View>
                                <View style={styles.eventListTimestamp}>
                                    <Text style={styles.eventListDate}>{formatDate(event.start_date)}</Text>
                                    <Text style={styles.eventListTime}>
                                        {getTimeFromDate(event.start_date)} - {getTimeFromDate(event.end_date)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    ))}
                    {isFetchingMore && (
                    <View style={styles.loaderContainer}>
                        <ScrollLoader />
                    </View>
                )}
            </View>
        </ScrollView>
        </View>
    );
}

export default PastEventScreen;

let MIN_HEIGHT;
let SPRIT_HEIGHT;
let SOP_HEIGHT;
if (is7InchTablet) {
    MIN_HEIGHT = 400; // Value for 7-inch tablet
    SPRIT_HEIGHT = 180;
    SOP_HEIGHT = '48%';
} else {
    MIN_HEIGHT = 250; // Value for other screens
    SPRIT_HEIGHT = 240;
    SOP_HEIGHT = '100%';
}
const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
const styles = StyleSheet.create({
viewContent:{
    flexDirection: 'column',
    backgroundColor:'#fff',
    paddingTop:45 // For IOS
},
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingBottom:40
    },
imageWrapper:{
    backgroundColor:'#fff',
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: 1,
    padding:20,
},
loadMoreButton: {
    backgroundColor: '#fff',
    borderColor: '#dbdbdb',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  loadMoreText: {
    fontSize: 16,
    color: '#363434',
    fontWeight: 'bold',
  },
imageRap:{
    width:'100%',
    height: MIN_HEIGHT,
    borderRadius:8
},
    headingTittle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop:20,
    fontFamily: font,
    marginLeft:20
},
    subHeading:{
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
        fontFamily: font,
    },
    
    eventTitle: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: font,
        color: '#363434',
        marginBottom: 6,
        marginTop:10,
        lineHeight:28,
        fontWeight:'bold'
    },
    eventTimestamp:{
        display:'flex',
        flexDirection: 'row',
        paddingTop:10,
        marginBottom:10
    },
    eventDate:{
        textAlign:'left',
        flex: 1,
    },
    eventTime:{
        textAlign: 'right',
        justifyContent: 'flex-end',
        flex: 1,
    },
    eventList:{
        display: 'flex',
        flexDirection: 'row',
    },
    eventListImage:{
        height: MIN_HEIGHT / 3,
        width: '40%',
        margin: 5,
        borderRadius:8
    },
    eventContentDetails:{
        width: '60%',
        paddingLeft: 5,
        paddingRight: 5,
    },
    eventListTitle:{
        marginBottom:10,
        fontSize:15,
        paddingTop:5,
    },
    eventListTimestamp:{
        display: 'flex',
        flexDirection: 'row',
    },
    eventListDate:{
        flex:1,
        paddingLeft:10
    },
    eventListTime: {
        alignItems: 'flex-end',
        flex: 1,
        textAlign:'right'
    },
    eventlistDetails:{
        marginBottom: 10
    },
    staticContent:{
        paddingLeft:20,
        paddingRight: 20,
    },
    eventContainer:{
        flexDirection:'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    contentOfEvent:{
        width: '50%',
        marginTop: 10,
    },
    eventText:{
        backgroundColor: '#fff', // Set your desired background color
        borderRadius: 8,
        // Shadow properties
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // For Android shadow
        padding: 10,
        margin:5,
        alignItems: 'center',
        height: SPRIT_HEIGHT
    },
    eventOfImage:{
        width:50,
        height:50
    },
    eventSubTitle:{
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 5,
        fontFamily: font,
    },
    eventSubDesc:{
        textAlign: 'center',

    },
    contiantConnection:{
        marginTop:20,
        alignItems:'center',
        width:SOP_HEIGHT,
        marginRight:10
    },
    connImage:{
        width:'100%',
        height:200,
        borderRadius: 8,    
    },
    connectionDesc:{
        backgroundColor: '#f1f2f4', // Set your desired background color
        borderRadius: 8,
        // Shadow properties
        padding: 15,
        width:'90%',
        marginTop:-80,
        paddingBottom:25
    },
    connectionHeading:{
        flexDirection:'row',
        marginBottom:10,
    },
    connSubHead:{
        fontWeight:'bold',
        position:'absolute',
        right:0,
        fontStyle:'normal'
    },
    connTitle:{
        fontWeight:'bold',
        width:'70%'
    },
    subHeadTwo:{
        alignItems:'center',
        width:'100%'
    },
    subHeading2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 40,
        fontFamily: font,
        textAlign: 'center',
    },
    parallexImage:{
        width:'100%',
        height:250,
        marginBottom:30,
        marginTop:20
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
        height: 30,
        marginLeft: 15,
        marginTop: 5,
        paddingLeft: 6,
        paddingRight: 6
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