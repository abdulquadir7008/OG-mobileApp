import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import AustraliaImage from './../assets/flag/australia.jpg';
import chinaImage from './../assets/flag/china.jpg';
import honkImage from './../assets/flag/honkong.jpg';
import IndiaImage from './../assets/flag/India.jpg';
import IndonesiaImage from './../assets/flag/indonesia.jpg';
import MalaysiaImage from './../assets/flag/malasiya.jpg';
import NewZealandImage from './../assets/flag/new-zaland.jpg';
import philipImage from './../assets/flag/philipines.jpg';
import SingaporeImage from './../assets/flag/singapore.jpg';
import TaiwanImage from './../assets/flag/tawian.jpg';
import ThailandImage from './../assets/flag/Thailand.jpg';
import vietnamImage from './../assets/flag/vietnam.jpg';
import GlobalImage from './../assets/flag/global.png';


const countryData = [
    { label: 'Global', value: '', image: GlobalImage },
    { label: 'Australia', value: '15', image: AustraliaImage },
    { label: 'China', value: '14', image: chinaImage },
    { label: 'Hong Kong', value: '22', image: honkImage },
    { label: 'India', value: '9', image: IndiaImage },
    { label: 'Indonesia', value: '23', image: IndonesiaImage },
    { label: 'Malaysia', value: '27', image: MalaysiaImage },
    { label: 'New Zealand', value: '28', image: NewZealandImage },
    { label: 'The Philippines', value: '29', image: philipImage },
    { label: 'Singapore', value: '8', image: SingaporeImage },
    { label: 'Taiwan', value: '43', image: TaiwanImage },
    { label: 'Thailand', value: '20', image: ThailandImage },
    { label: 'Vietnam', value: '7', image: vietnamImage },
    
];

const CountryDropdown = () => {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onCountryChange = (value) => {
        setSelectedCountry(value);
        toggleModal();

        // Store the selected value in AsyncStorage
        AsyncStorage.setItem('selectedCountry', value)
            .then(() => {
                navigation.navigate('CountryScreen', { countryId: value });
            })
            .catch((error) => {
                console.error('Error storing selected country: ', error);
            });
    };


    useEffect(() => {
        // Retrieve the selected country value from AsyncStorage when the component mounts
        AsyncStorage.getItem('selectedCountry')
            .then((value) => {
                if (value) {
                    setSelectedCountry(value);
                }
            })
            .catch((error) => {
                console.error('Error retrieving selected country: ', error);
            });
    }, []);

    return (
        <View>
            <Text style={{ marginLeft: 10, textTransform: 'capitalize', fontWeight: 'bold' }}>Select Country:</Text>
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.selectedCountryContainer}>
                    {selectedCountry && countryData.find((country) => country.value === selectedCountry)?.image && (
                        <Image
                            source={countryData.find((country) => country.value === selectedCountry)?.image}
                            style={styles.RiskImage}
                        />
                    )}
                    <Text style={{color:'#fff'}}>{countryData.find((country) => country.value === selectedCountry)?.label}</Text>
                </View>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
                <View style={styles.modalContainer}>
                    {countryData.map((country) => (
                        <TouchableOpacity
                            key={country.value}
                            style={styles.dropdownItem}
                            onPress={() => onCountryChange(country.value)}
                        >
                            {country.image && (
                                <Image
                                    source={country.image}
                                    style={styles.RiskImage}
                                />
                            )}
                            <Text>{country.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </View>
    );
};

export default CountryDropdown;
const styles = StyleSheet.create({
    RiskImage: {
        width: 30,
        height: 18,
        marginRight: 10,
    },
    selectedCountryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor:'#000',
        margin:10,
        color: '#fff'
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    dropdownItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth:1,
        borderBottomColor:'#e8ebee',
        

    },
    
});