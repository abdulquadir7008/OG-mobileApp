import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/load.gif')} style={{ height: 60, width: 60 }} />
        </View>
    );
};
const phoneNumber = '+65 6303 0680'; // Replace this with your actual phone number

const handlePhonePress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
};
const emailWork = 'opengov@opengovasia.com'; // Replace this with your actual work email
const emailHello = 'opengov@opengovasia.com'; // Replace this with your actual hello email
const emailJoinUs = 'opengov@opengovasia.com';
const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`);
};

const ContactUsScreen = () => {
  
     
    return (
        <ScrollView>
            <View style={styles.container}>

                <Text style={styles.title}>LET'S TALK</Text>
                <View style={{flexDirection:'row',padding:20, marginTop:20}}>
                    <View style={{ borderWidth: 1, borderColor: '#e5e6e7',padding:5,width:'20%',alignItems:'center',justifyContent:'center', height:60 }}>
                        <Image source={require('../assets/address.png')} style={{width:30,height:30}}></Image>
                    </View>
                    <View style={{width:'70%'}}>
                        <Text style={{ paddingLeft: 20, fontSize: 15,fontWeight:'bold' }}>
                        CIO Network Pte Ltd
                        </Text>
                        <Text style={{paddingLeft:20,fontSize:15}}>
                            2 Boon Leat Terrace
                        </Text>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>
                            Harbourside Building 2
                        </Text>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>
                            #03-01
                        </Text>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>
                            Singapore 119844
                        </Text>
                        
                    </View>
                </View>
                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <View style={{ borderWidth: 1, borderColor: '#e5e6e7', padding: 5, width: '20%', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                        <Image source={require('../assets/phone.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                    <TouchableOpacity onPress={handlePhonePress} style={{ width: '70%' }}>
                        <Text style={{ paddingLeft: 20, paddingTop: 15, fontSize: 15 }}>{phoneNumber}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <View style={{ borderWidth: 1, borderColor: '#e5e6e7', padding: 5, width: '20%', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                        <Image source={require('../assets/email.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleEmailPress(emailWork)} style={{ width: '70%' }}>
                        <Text style={{ paddingLeft: 20, fontSize: 15, fontWeight: 'bold' }}>Work With Us</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>{emailWork}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <View style={{ borderWidth: 1, borderColor: '#e5e6e7', padding: 5, width: '20%', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                        <Image source={require('../assets/hello.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleEmailPress(emailHello)} style={{ width: '70%' }}>
                        <Text style={{ paddingLeft: 20, fontSize: 15, fontWeight: 'bold' }}>Say Hello</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>{emailHello}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', padding: 20 }}>
                    <View style={{ borderWidth: 1, borderColor: '#e5e6e7', padding: 5, width: '20%', alignItems: 'center', justifyContent: 'center', height: 60 }}>
                        <Image source={require('../assets/joinus.png')} style={{ width: 30, height: 30 }}></Image>
                    </View>
                    <TouchableOpacity onPress={() => handleEmailPress(emailJoinUs)} style={{ width: '70%' }}>
                        <Text style={{ paddingLeft: 20, fontSize: 15, fontWeight: 'bold' }}>Join Us</Text>
                        <Text style={{ paddingLeft: 20, fontSize: 15 }}>{emailJoinUs}</Text>
                    </TouchableOpacity>
                </View>
                  
            </View>
        </ScrollView>
    );
}

export default ContactUsScreen;

const font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 35,
        fontFamily: font,
    },
 

});