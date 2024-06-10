import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/load.gif')} style={{ height: 60, width: 60 }} accessibilityLabel="Loading Animation" />
        </View>
    );
};
const PastEventYear = () => {
    const navigation = useNavigation();
    const handlePostPress = (pastEventId) => {
        navigation.navigate('Past Event', { pastEventId });
    };
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Past Event</Text>
                <View style={styles.pastCont}>
                
                <View style={styles.pastEventCont}>
                        <TouchableHighlight onPress={() => handlePostPress('2023')}>
                        <ImageBackground
                                source={require('../assets/singapore-architecture-g9ac3e28fd_1280-1.jpg')} // Provide the path to your image
                                style={styles.backgroundImage}
                        >
                            <View style={styles.pastEventYear}>
                                <Text style={styles.pastEventText}>2023</Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>

                <View style={styles.pastEventCont}>
                    <TouchableHighlight onPress={() => handlePostPress('2022')}>
                        <ImageBackground
                                source={require('../assets/shutterstock_1658221573-scaled.jpg')} // Provide the path to your image
                            style={styles.backgroundImage}
                        >
                            <View style={styles.pastEventYear2}>
                                <Text style={styles.pastEventText}>2022</Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>

                <View style={styles.pastEventCont}>
                    <TouchableHighlight onPress={() => handlePostPress('2021')}>
                        <ImageBackground
                                source={require('../assets/shutterstock_1522385213-scaled.jpg')} // Provide the path to your image
                            style={styles.backgroundImage}
                        >
                            <View style={styles.pastEventYear3}>
                                <Text style={styles.pastEventText}>2021</Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>

                <View style={styles.pastEventCont}>
                    <TouchableHighlight onPress={() => handlePostPress('2020')}>
                        <ImageBackground
                                source={require('../assets/shutterstock_1836326647-scaled.jpg')} // Provide the path to your image
                            style={styles.backgroundImage}
                        >
                            <View style={styles.pastEventYear4}>
                                <Text style={styles.pastEventText}>2020</Text>
                            </View>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>

                    <View style={styles.pastEventCont}>
                            <ImageBackground
                                source={require('../assets/shutterstock_495493495-scaled.jpg')} // Provide the path to your image
                                style={styles.backgroundImage}
                            >
                            <View style={styles.pastEventYear5}>
                                <Text style={styles.pastEventText2}>For 2015 To 2019 Past Events, Kindly Contact Us At</Text>
                                <Text style={styles.pastEventText3}>Opengov@Opengovasia.Com</Text>
                                </View>
                            </ImageBackground>
                    </View>

            </View> 
            </View>
        </ScrollView>
    );
}

export default PastEventYear;

const MIN_HEIGHT = 250;
const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 20,
        fontFamily: font,
    },
    pastCont:{
        flexDirection: 'row',
        flexWrap: 'wrap',
       
    },
    pastEventCont:{
        width: '100%',
        margin:5

    },
    pastEventYear:{
        backgroundColor:'rgba(219, 32, 236, 0.5)',
        alignItems:'center',
        
    },
    pastEventYear2: {
        backgroundColor: 'rgba(255, 162, 0, 0.5)',
        alignItems: 'center',

    },
    pastEventYear3: {
        backgroundColor: 'rgba(0, 78, 255, 0.5)',
        alignItems: 'center',

    },
    
    pastEventYear4: {
        backgroundColor: 'rgba(26, 136, 41, 0.5)',
        alignItems: 'center',

    },
    pastEventYear5: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        alignItems: 'center',

    },
    backgroundImage: {
        flex: 1, 
        resizeMode: 'cover',
        
    },
    pastEventText:{
        margin:40,
        color:'#fff',
        fontWeight:'bold',
        fontSize:35
    },
    pastEventText2: {
        fontSize: 25,
        margin: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom:0
    },
    pastEventText3: {
        fontSize: 20,
        margin: 10,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom:40
    }

});