import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { View, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import store from './app/redux/store';
import * as Notifications from 'expo-notifications';

import ArticleScreen from './app/screens/ArticleScreen';
import OGTVScreen from './app/screens/OGTVScreen';
import AboutUsScreen from './app/screens/AboutusScreen';
import ContactUsScreen from './app/screens/ContactUsScreen';
import PostDetailsScreen from './app/screens/PostDetails';
import EventDetailsScreen from './app/screens/eventDetails';
import PastEventScreen from './app/screens/PastEventScreen';
import PastEventDetail from './app/screens/pastEventDetails';
import CountryDropdown from './app/components/CountryDropdown';
import HomeTabsScreen from './app/screens/DashboardTabsScreen';
import CountryArticleScreen from './app/screens/CountryArticleScreen';

const Drawer = createDrawerNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const Logo = (props)=>{
  const navigation = useNavigation();
  return (
    <View style={styles.headerMenu}>
      <View>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />

      </View>
      <View style={styles.menuWidth}>
        <DrawerItem label="" 
          icon={({ focused, color, size }) => <Image source={require('./app/assets/menu.png')} style={styles.icon} />}
          onPress={() => props.navigation.toggleDrawer()} accessibilityLabel="Menu" 
          style={{
            // borderWidth:1, 
            alignSelf:'flex-start',
            width:40,
            height:45
            }} />
        
        </View>
      <View style={styles.logAlign}>
        <TouchableOpacity onPress={() => {
          navigation.navigate('Articles')
        }}>
        <Image
          source={require('./app/assets/logo.png')}
          style={styles.logo} accessibilityLabel="OpenGov"
        />
        </TouchableOpacity>
      </View>
    </View>
      
  );
};
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.logDrawerAlign}>
        <Image
          source={require('./app/assets/logo.png')}
          style={styles.logo} accessibilityLabel="OG"
        />
      </View>
      <DrawerItemList {...props}  />
      <CountryDropdown />
    </DrawerContentScrollView>
  );
};



export default function App() {

  const registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        console.log('Failed to get push token for push notification. Permission not granted.');
        return;
      }
  
      const tokenData = await Notifications.getExpoPushTokenAsync();
      const expoPushToken = tokenData.data;
  
      // Now you have the Expo Push Token
      console.log('Expo Push Token:', expoPushToken);
  
      // You may want to send this token to your server for later use
      sendTokenToServer(expoPushToken);
    } catch (error) {
      console.error('Error getting push token:', error);
    }
  };

  return (
   
    <Provider store={store}>
     
        <NavigationContainer>

        <Drawer.Navigator
          initialRouteName='Article'
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerTitle: null,
            header: (props) => <Logo {...props} />,
            drawerActiveTintColor: '#fff',
            drawerActiveBackgroundColor: '#083066',
            drawerInactiveTintColor: '#fff',
            drawerInactiveBackgroundColor: '#0b4696',
            drawerStyle: {
              width: '50%',
              backgroundColor: '#0b4696',
            }
          }}
        >
          <Drawer.Screen name='Articles' component={ArticleScreen} 
            options={{
              headerTitle: '', drawerItemStyle: { height: 48 }
           }}  />  
          <Drawer.Screen name='Events' component={HomeTabsScreen} options={{ headerTitle: '', drawerItemStyle: { height: 48 } }} />
          <Drawer.Screen name='OpenGov TV' component={OGTVScreen} options={{ headerTitle: '', drawerItemStyle: { height: 48 } }} />   
          <Drawer.Screen name='About Us' component={AboutUsScreen} options={{ headerTitle: '', drawerItemStyle: { height: 48 } }} />
          <Drawer.Screen name='Contact Us' component={ContactUsScreen} options={{ headerTitle: '', drawerItemStyle: { height: 48 } }} />
          <Drawer.Screen name='Review' component={PostDetailsScreen} options={{ drawerLabel: '', headerTitle: '', headerShown: false, drawerItemStyle: { height: 0 } }}   />
          <Drawer.Screen name='EventDetails' component={EventDetailsScreen} options={{ drawerLabel: '', headerTitle: '', headerShown: false, drawerItemStyle: { height: 0 } }} />
          <Drawer.Screen name='Past Event' component={PastEventScreen} options={{ drawerLabel: '', headerTitle: '', headerShown: false, drawerItemStyle: { height: 0 } }} />  
          <Drawer.Screen name='PastEventDetail' component={PastEventDetail} options={{ drawerLabel: () => null, headerTitle: '', headerShown: false, drawerItemStyle: { height: 0 } }} />
          <Drawer.Screen name='CountryScreen' component={CountryArticleScreen} options={{ drawerLabel: () => null, headerTitle: '',  drawerItemStyle: { height: 0 } }} />    
          </Drawer.Navigator>
        </NavigationContainer>
     
    </Provider>
    
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 37,
    height: 37,
    resizeMode: 'contain',
    backgroundColor: '#0b4596',
    marginTop:4
  },
  logAlign:{
    backgroundColor:'#0b4596',
    position:'absolute',
    width:60,
    height:45,
    right:0,
    top:40, //For IOS
    // top:4, //for android
    alignItems:'center',
    zIndex:100
  },
  logDrawerAlign:{
    position:'relative',
    marginBottom:10,
    alignSelf:'center',
    padding:10,
    backgroundColor:'#0b4596',
    borderRadius:10,
  },
  icon: {
    width: 24,
    height: 24,
    alignItems:'center'
  },
  headerMenu:{
    // marginTop:28,
    marginTop: 0,
    backgroundColor:'#ffffff',
    borderBottomWidth:1,
    borderColor:'#e3e3e3',
    paddingTop:45 //For IOS
  },
});