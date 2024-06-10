import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


const Loader = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/load.gif')} style={{ height: 60, width: 60 }} accessibilityLabel="Loading Animation" />
        </View>
    );
};

const AboutUsScreen = () => {
    const [delightedCustomers, setDelightedCustomers] = useState(0);
    const [numberOfAttendees, setNumberOfAttendees] = useState(0);
    const [newMonthlyReaders, setNewMonthlyReaders] = useState(0);

    useEffect(() => {
        // Function to update the counts at regular intervals
        const updateCounts = () => {
            const incrementValue = 100;
            const incrementValue2 = 500;
            const incrementValue3 = 1000;
            if (delightedCustomers < 1051) {
                setDelightedCustomers((prevCount) => Math.min(prevCount + incrementValue, 1051));
            }

            if (numberOfAttendees < 13988) {
                setNumberOfAttendees((prevCount) => Math.min(prevCount + incrementValue2, 13988));
            }

            if (newMonthlyReaders < 87811) {
                setNewMonthlyReaders((prevCount) => Math.min(prevCount + incrementValue3, 87811));
            }

            // Check if all counts have reached their maximum values
            if (delightedCustomers >= 1051 && numberOfAttendees >= 13988 && newMonthlyReaders >= 87811) {
                // Clear the interval once all counts have reached their targets
                clearInterval(interval);
            }
        };

        // Set up the interval to update the counts every 100ms (0.1 seconds)
        const interval = setInterval(updateCounts, 1);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, [delightedCustomers, numberOfAttendees, newMonthlyReaders]);

    const logos = [
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/A10.png'}, label: 'A10 Networks' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/acl-1.png'}, label: 'ACL' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Alterix.png'}, label: 'Alterix' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Amazon.png'}, label: 'Amazon' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/AML.png'}, label: 'AML' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Arista.png'}, label: 'Arista' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/bentley.png'}, label: 'bentley' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Blue-Power.png'}, label: 'Blue-Power' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Broadcom_logo.png'}, label: 'Broadcom_logo' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Bureau-Van.png'}, label: 'Bureau-Van' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Changepoint.png'}, label: 'Changepoint' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/CIH.png'}, label: 'CIH' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Cisco.png'}, label: 'Cisco' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Cloud-Vision.png'}, label: 'Cloud Vision' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Cloudera.png'}, label: 'Cloudera' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Crimson-logic.png'}, label: 'Crimson logic' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Datacom.png'}, label: 'Datacom' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Delaware.png'}, label: 'Delaware' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/eG.png'}, label: 'eG' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Equinix-1.png'}, label: 'Equinix' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Esri.png'}, label: 'Esri' },

        // Add more logo images here as needed
    ];

    const secondLogos = [
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Malware-Bytes.png'}, label: 'Malware Bytes' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Marklogic.png'}, label: 'Marklogic' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Maxis.png'}, label: 'Maxis' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Mellanox.png'}, label: 'Mellanox' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Microsoft.png'}, label: 'Microsoft' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/NCS.png'}, label: 'NCS' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Net-App.png'}, label: 'Net App' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Newgen-Software-_Indian.png'}, label: 'Newgen Software Indian' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Nutanix.png'}, label: 'Nutanix' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/One-Connection.png'}, label: 'One Connection' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Open-Text.png'}, label: 'Open Text' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Optus.png'}, label: 'Optus' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Oracle.png'}, label: 'Oracle' },
        // Add more logo images here as needed
    ];

    const thirdLogos = [
        { source: { uri: "https://opengovasia.com/wp-content/uploads/2020/10/PLDT.png"}, label: 'PLDT' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Polycom.png'}, label: 'Polycom' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Qlik-Q.png'}, label: 'Qlik Q' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Riverbed.png'}, label: 'Riverbed' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/sap.png'}, label: 'sap' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Sas.png'}, label: 'Sas' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Schneider.png'}, label: 'Schneider' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Servian.png'}, label: 'Servian' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Signavio.png'}, label: 'Signavio' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Singtel.png'}, label: 'Singtel' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Sita.png'}, label: 'Sita' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Sophos.png'}, label: 'Sophos' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Splunk.png'}, label: 'Splunk' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Stratus.png'}, label: 'Stratus' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Suse.png'}, label: 'Suse' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Sysmantec.png'}, label: 'Sysmantec' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/T.png'}, label: 'T' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Talend.png'}, label: 'Talend' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Tech-Mahindara.png'}, label: 'Tech Mahindara' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Telkomsigma.png'}, label: 'Telkomsigma' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Time.png'}, label: 'Time' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Trend-micro.png'}, label: 'Trend micro' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Varonis.png'}, label: 'Varonis' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Veeam.png'}, label: 'Veeam' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/velocity.png'}, label: 'velocity' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Veritas.png'}, label: 'Veritas' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/VM-ware.png'}, label: 'VM ware' },
        { source: { uri: 'https://opengovasia.com/wp-content/uploads/2020/10/Whale-Cloud.png'}, label: 'Whale Cloud' },

        // Add more logo images here as needed
    ];
    class LogoItem extends React.PureComponent {
        render() {
            const { source, label } = this.props.item;
            return (
                <View style={styles.imgScroller}>
                    <Image source={source} style={styles.logo} accessibilityLabel={label} />
                </View>
            );
        }
    }
    
    return (
        <ScrollView>
            <View style={styles.container}>
                
                <Text style={styles.title}>About Us</Text>
                <View>
                    <Text style={{color:'#113F9D',fontSize:18, fontWeight:'bold', marginBottom:10}}>We are YOUR team</Text>
                    <Text>Clear Thinking, Straight-talking, Fast Moving.</Text>
                    <Text style={{ fontSize: 16, marginTop:10, fontWeight: 'bold', marginBottom: 10 }}>Our mission is to enable sharing of ideas, knowledge and expertise through our interactive platforms to better serve citizens and clients.</Text>
                    <Text>We consistently focus on delivering exciting engagements using innovative methods and latest technology.</Text>
                </View>
                <View style={styles.countMain}>
                    <View style={styles.countSub}>
                        <Text style={styles.countNumber}>{delightedCustomers}</Text>
                        <Text style={styles.countText}>Delighted Customers</Text>
                    </View>
                    <View style={styles.countSub}>
                        <Text style={styles.countNumber}>{numberOfAttendees}</Text>
                        <Text style={styles.countText}>Number of Attendees</Text>
                    </View>
                    <View style={styles.countSub}> 
                        <Text style={styles.countNumber}>{newMonthlyReaders}</Text>
                        <Text style={styles.countText}>New Monthly Readers</Text>
                    </View>
                </View>
                <View style={styles.ourUniverse}>
                    <Text style={styles.univTittle}>Our Universe</Text>
                    <View style={{ borderTopWidth: 1, borderRightWidth: 1, borderColor: '#ccc',}}>
                        <FlatList
                        data={logos}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <LogoItem item={item} />
                            )}
                        />

                    <FlatList
                        data={secondLogos}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <LogoItem item={item} />
                        )}
                    />
                    <FlatList
                        data={thirdLogos}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <LogoItem item={item} />
                        )}
                    />
                    </View>


                </View>
                <View style={styles.commitContent}>
                    <Text style={styles.commitTittle}>Commit, Work Hard, Deliver.</Text>
                    <Image source={{ uri: 'https://opengovasia.com/wp-content/uploads/2020/05/explore-icon.png' }} style={styles.commitImage} accessibilityLabel="Commit, Work Hard, Deliver"></Image>
                </View>
                
                <Text style={styles.title}>Our Work</Text>
                <Text style={{fontWeight:'bold',fontSize:16, marginBottom:10}}>INNOVATION. COLLABORATION. PERFORMANCE</Text>
                <Text style={{marginBottom:10}}>We are a team of talented, experienced, creative and agile individuals who are always pushing the envelope to create something magical for YOU!</Text>
                <Text style={{ marginBottom: 10 }}>A multi- and inter-disciplinary team, our skill set encompasses relationship building with private and public sectors, sales, marketing and operations.</Text>
                <Text style={{ marginBottom: 10 }}>We are always thinking of new ways of getting the right people in front of YOU!</Text>
                <Image source={require('../assets/aboutImage.jpg')} 
                style={{ height: 170, width: '100%', marginBottom: 20 }} 
                accessibilityLabel="Innovation. Collaboration. Performance"></Image>

                <Text style={styles.title}>Our Achievements</Text>
                <Text style={{ marginBottom: 10 }}>OpenGov Asia has received recognition and appreciation from significant bodies across sectors.</Text>
                <Text style={{ marginBottom: 10 }}>The recognition we receive is a testament to the quality of our work and the faith that our partners have in us.
</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>OTHERS recognise US for our commitment to YOU!
</Text>
               
                <Image source={require('../assets/aboutimg2.jpg')} style={{ height: 170, width: '100%', marginBottom: 20 }} accessibilityLabel="Our Achievements"></Image>

            </View>
        </ScrollView>
    );
}

export default AboutUsScreen;

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
    countMain: {
        flexDirection: 'row',
        display: 'flex',
        marginTop: 20,
        marginBottom: 20,
    },
    countSub: {
        width: '33%',
        alignItems: 'center',

    },
    countNumber: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    countText: {
        textAlign: 'center'
    },
    univTittle:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 20,
        fontFamily: font,
    },
    imgScroller:{
        width:100,
        padding:10,
        borderBottomWidth:1,
        borderColor:'#ccc',
        paddingBottom:20,
        paddingTop:20,
        borderLeftWidth: 1,
        alignItems:'center'
        
    },
    logo: {
        width: '100%',
        marginHorizontal: 10,
        height:40,
    },
    commitTittle:{
        textAlign:'center',
        fontWeight:'bold',
        fontFamily: font,
        fontSize:30,
        color:'#0b49a0',
        marginTop:30,
        marginBottom:20
    },
    commitImage:{
        width:200,
        height:200,
        alignSelf:'center'
    }

});