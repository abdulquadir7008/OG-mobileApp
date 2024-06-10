
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import EventScreen from './EventScreen';
import PastEventYear from './PastEventYear';

const Tab = createMaterialTopTabNavigator();

const HomeTabsScreen = ({ navigation }) => {    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Upcoming Events" component={EventScreen} />
            <Tab.Screen name="Past Events" component={PastEventYear} />
        </Tab.Navigator>
    );
}

export default HomeTabsScreen;