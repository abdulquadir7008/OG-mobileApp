import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Platform, ScrollView, TouchableHighlight, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
const EventScreen = () => {
    const [events, setEvents] = useState([]);
    const [isFetching, setIsFetching] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMorePages, setHasMorePages] = useState(true);
    const site = "https://opengovasia.com";

    useEffect(() => {   
        fetchData(currentPage);
        
    }, []);

    const fetchData = async (page) => {
        setIsFetching(true);
        try {
            const response = await fetch(
                `https://opengovasia.com/wp-json/wp/v2/fat-event/?page=${page}&_embed&per_page=30`
            );
            const data = await response.json();
            const filteredEvents = data.filter(
                (event) => event.start_date && event.start_date !== ''
            );
            const sortedEvents = sortEventsByStartDate(filteredEvents);
            if (sortedEvents.length === 0) {
                setHasMorePages(false);
            }
            setEvents((prevEvents) => [...prevEvents, ...sortedEvents]);
            setIsFetching(false);
        } catch (error) {
            console.error(error);
        }
    };


    const isUpcomingEvent = (startDate) => {
        const currentDate = moment().startOf('day');
        const eventStartDate = moment(startDate, 'YYYY/MM/DD').startOf('day');
        return eventStartDate >= currentDate;
    };
    const sortEventsByStartDate = (events) => {
        return events.sort((a, b) => {
            const dateA = moment(a.start_date, 'YYYY/MM/DD').startOf('day');
            const dateB = moment(b.start_date, 'YYYY/MM/DD').startOf('day');
            return dateA - dateB;
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
    

    const firstUpcomingEvent = events.find(event => isUpcomingEvent(event.start_date));

    const navigation = useNavigation();
    const handlePostPress = (eventId) => {
        navigation.navigate('EventDetails', { eventId });
    };
    const handleScroll = (event) => {
        // Calculate if the user has scrolled to the end of the content
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isEndReached = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50; // Adjust the threshold value if needed

        if (isEndReached && !isFetching && hasMorePages) {
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
            
        
        <ScrollView horizontal={false} scrollEventThrottle={400} // Adjust the threshold as needed
            onScroll={handleScroll}>
               
            <View style={styles.viewContent}>
                <Text style={styles.headingTittle}>Upcoming Events</Text>
                {/* Static Content Start */}
                <View style={styles.staticContent}>
                    <Text>Be on a lookout for our content rich and engaging events across ASEAN and register now to get informed and empowered.</Text>
                    <Text style={styles.subHeading}>Why Attend Our Events</Text>
                    <Text>We champion events delivery in both the physical and the virtual space. Come, be a part of the OpenGov experience</Text>
                    <View style={styles.eventContainer}>
                        <View style={styles.contentOfEvent}>
                            <View style={styles.eventText}>
                                <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/1-2.png' }} style={styles.eventOfImage}></Image>
                                <Text style={styles.eventSubTitle}>Content Rich</Text>
                                <Text style={styles.eventSubDesc}>Our events feature relevant content sharing from Subject Matter experts on timely topics.</Text>
                            </View>
                        </View>
                        <View style={styles.contentOfEvent}>
                            <View style={styles.eventText}>
                                <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09//2-1.png' }} style={styles.eventOfImage}></Image>
                                <Text style={styles.eventSubTitle}>Highly Interactive</Text>
                                <Text style={styles.eventSubDesc}>Both our physical and virtual events are designed to enable high degree of interaction with our audience, enhancing the learning experience.</Text>
                            </View>
                        </View>
                        <View style={styles.contentOfEvent}>
                            <View style={styles.eventText}>
                                <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/2-1.png' }} style={styles.eventOfImage}></Image>
                                <Text style={styles.eventSubTitle}>Knowledge Sharing</Text>
                                <Text style={styles.eventSubDesc}>We invite leaders across Asia Pacific sharing intelligence on our unique platforms.</Text>
                            </View>
                        </View>
                        <View style={styles.contentOfEvent}>
                            <View style={styles.eventText}>
                                <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/2-1.png' }} style={styles.eventOfImage}></Image>
                                <Text style={styles.eventSubTitle}>Strong Network</Text>
                                <Text style={styles.eventSubDesc}>We are proud of strong connections both in public and private sectors with over 12 yrs experience in public and private domains.</Text>
                            </View>
                        </View>
                        <View style={styles.contentOfEvent}>
                            <View style={styles.eventText}>
                                <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/2-1.png' }} style={styles.eventOfImage}></Image>
                                <Text style={styles.eventSubTitle}>Short and Zesty</Text>
                                <Text style={styles.eventSubDesc}>We value time and have mastered delivery in the shortest time possible.</Text>
                            </View>
                        </View>
                        <View style={styles.contentOfEvent}>
                            <View style={styles.eventText}>
                                <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/2-1.png' }} style={styles.eventOfImage}></Image>
                                <Text style={styles.eventSubTitle}>Unique Delivery</Text>
                                <Text style={styles.eventSubDesc}>OpenGov Asia is known for innovation in our delivery mechanism and setting new industry standards.</Text>
                            </View>
                        </View>
                        <View style={styles.subHeadTwo}>
                            <Text style={styles.subHeading2}>Accelerate Your Learnings And Connections</Text>
                        </View>


                        <View style={styles.contiantConnection}>
                            <Image style={styles.connImage} source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/IMG-2.jpg' }} />
                            <View style={styles.connectionDesc}>
                                <View style={styles.connectionHeading}>
                                    <Text style={styles.connTitle}>OpenGov Asia Leadership Forum</Text>
                                    <Text style={styles.connSubHead}>Physical/ Virtual</Text>

                                </View>
                                <Text>
                                    Our award-winning OpenGov Gamification Table (OGT) format allows for
                                    intimate conversations with delegates, especially those who influence and determine
                                    digital strategies within their organisation. Our events are high on energy and enable
                                    learning through play.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.contiantConnection}>
                            <Image style={styles.connImage} source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/IMG-3.jpg' }} />
                            <View style={styles.connectionDesc}>
                                <View style={styles.connectionHeading}>
                                    <Text style={styles.connTitle}>OpenGov Asia Breakfast Insight</Text>
                                    <Text style={styles.connSubHead}>Physical</Text>

                                </View>
                                <Text>
                                    Our breakfast insight sessions are customised events with laser-like
                                    focus on current topics that enable information exchange between CXO’s.
                                    These are highly interactive and engaging sessions with live polling and
                                    group discussion.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.contiantConnection}>
                            <Image style={styles.connImage} source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/IMG-4.jpg' }} />
                            <View style={styles.connectionDesc}>
                                <View style={styles.connectionHeading}>
                                    <Text style={styles.connTitle}>OpenGov Asia Tech Day</Text>
                                    <Text style={styles.connSubHead}>Physical</Text>

                                </View>
                                <Text>
                                    OpenGov Tech Day sessions are concise, targeted events featuring hands-on gamification
                                    designed to bring learning among the influencers and the doers. There are lots of engagement
                                    and group discussions resulting in more in-depth understanding of the subject.
                                </Text>
                            </View>
                        </View>

                        <View style={styles.contiantConnection}>
                            <Image style={styles.connImage} source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/IMG-5.jpg' }} />
                            <View style={styles.connectionDesc}>
                                <View style={styles.connectionHeading}>
                                    <Text style={styles.connTitle}>OpenGovLive! Virtual Insight</Text>
                                    <Text style={styles.connSubHead}>Virtual</Text>

                                </View>
                                <Text>
                                    Highly requested OpenGov Asia Breakfast Insight is now Virtual! OpenGovLive!
                                    allows delegates globally to attend our relevant sessions and the opportunity to
                                    learn and share their experiences. Transform your online events into engaging
                                    experiences, you and your attendees will look forward to. We are keeping reality
                                    in the Virtual World!
                                </Text>
                            </View>
                        </View>


                        <View style={styles.contiantConnection}>
                            <Image style={styles.connImage} source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/09/IMG.jpg' }} />
                            <View style={styles.connectionDesc}>
                                <View style={styles.connectionHeading}>
                                    <Text style={styles.connTitle}>OpenGovLive! Virtual Tech Day​</Text>
                                    <Text style={styles.connSubHead}>Virtual</Text>

                                </View>
                                <Text>
                                    Who says Virtual events are boring. Not at OpenGovLive! Virtual Tech Day.
                                    We are following the same format as our physical Tech Day, where delegates get
                                    engaged via group discussions and gamification in the virtual space.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.subHeadTwo}>
                            <Text style={styles.subHeading2}>Best of OpenGov Asia Events</Text>
                            <Text>Some of Our Favourite Moments</Text>
                            <Image source={require('../assets/Untitled-2.jpg')} style={styles.parallexImage}></Image>
                        </View>
                        <View style={styles.subHeadTwo}>
                            <Text style={styles.subHeading2}>Our Events</Text>

                        </View>

                    </View>
                </View>
                {/* Static Content Start */}
                {firstUpcomingEvent && (
                    <TouchableHighlight style={styles.imageWrapper} onPress={() => handlePostPress(firstUpcomingEvent.id)} underlayColor="#DDD">
                    <View key={firstUpcomingEvent.id}>
                            {firstUpcomingEvent._embedded['wp:featuredmedia'][0]?.source_url ? (
                                <Image style={styles.imageRap} source={{ uri: site + firstUpcomingEvent._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }} />
                            ) : (
                                    <Image style={styles.imageRap} />
                            )}
                           
                        <Text style={styles.eventTitle}>{firstUpcomingEvent.title.rendered}</Text>
                            <View style={styles.eventTimestamp}>
                            <Text style={styles.eventDate}>{formatDate(firstUpcomingEvent.start_date)}</Text>
                            <Text style={styles.eventTime}>{getTimeFromDate(firstUpcomingEvent.start_date)} - {getTimeFromDate(firstUpcomingEvent.end_date)}</Text>
                            </View>
                    </View>
                    </TouchableHighlight>
                )}


                {events
                    .filter(event => event !== firstUpcomingEvent)
                    .map((event, index) => ( // Add index as the second part of the key
                        isUpcomingEvent(event.start_date) && (
                        <TouchableHighlight
                            style={[styles.imageWrapper]} onPress={() => handlePostPress(event.id)}
                                underlayColor="#DDD" key={`${event.id}-${index}`}>
                            <View style={styles.eventlistDetails}>
                                <View style={styles.eventList}>
                                {/* <Text>{event.id}</Text> */}
                                        {event._embedded['wp:featuredmedia'][0]?.source_url ? (
                                            <Image
                                                style={styles.eventListImage}
                                                source={{ uri: site + event._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }}
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
                                    <Text style={styles.eventListTime}>{getTimeFromDate(event.start_date)} - {getTimeFromDate(event.end_date)}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    )
                ))}
                
          
                {isFetching && (
                    <View style={styles.loaderContainer}>
                        <ScrollLoader />
                    </View>
                )}
            </View>
        </ScrollView>
        </View>
    );
}

export default EventScreen;

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
    backgroundColor:'#fff'
},
    loaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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
    }
});