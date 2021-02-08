import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import LogNSignInNavigation from './LogNSignInNavigation';
import Colors from '../constantValues/Colors';

const Drawer = createDrawerNavigator();

const AppNavigation = props => {
    return (
        <Drawer.Navigator initialRouteName="Log Out" drawerStyle={{backgroundColor: Colors.drawer}}>
            <Drawer.Screen name="Main" component={MainScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="My Trips" component={MyTripsScreen} />
            <Drawer.Screen name="Log Out" component={LogNSignInNavigation} options={() => ({swipeEnabled: true})} />
        </Drawer.Navigator>
    );
};

export default AppNavigation;