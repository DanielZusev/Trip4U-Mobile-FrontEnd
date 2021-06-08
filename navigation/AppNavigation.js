import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainScreen from '../screens/MainScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MyTripsScreen from '../screens/MyTripsScreen';
import LogNSignInNavigation from './LogNSignInNavigation';
import BuildTripScreen from '../screens/BuildTripScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import DateNDestionationScreen from '../screens/DateNDestionationScreen';
import TripScreen from '../screens/TripScreen';
import Colors from '../constantValues/Colors';
import data from '../data/data.json';
import LogInScreen from '../screens/LogInScreen';
import SignInScreen from '../screens/SignUpScreen';

const Drawer = createDrawerNavigator();

const AppNavigation = props => {
    return (
        <Drawer.Navigator initialRouteName="Log Out" drawerStyle={{ backgroundColor: Colors.drawer }}>
            <Drawer.Screen
                name="Main"
                component={MainScreen}
                initialParams={{ email: '', pass: '' }}
                options={() => ({ swipeEnabled: false })} />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={() => ({ swipeEnabled: false })} />
            <Drawer.Screen
                name="My Trips"
                component={MyTripsScreen}
                options={() => ({
                    swipeEnabled: false,
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                })} />
            <Drawer.Screen
                name="Date N Des"
                component={DateNDestionationScreen}
                initialParams={{ email: '', pass: '' }}
                options={() => ({
                    swipeEnabled: false,
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                })} />
            <Drawer.Screen
                name="Categories"
                component={CategoriesScreen}
                initialParams={{
                    startPoint: '',
                    endPoint: '',
                    startDate: '',
                    endDate: '',
                    email: '',
                }}
                options={() => ({
                    swipeEnabled: false,
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                })} />
            <Drawer.Screen
                name="Build Trip"
                component={BuildTripScreen}
                initialParams={{
                    email: '',
                    startPoint: '',
                    endPoint: '',
                    startDate: '',
                    endDate: '',
                    dayLoad: '',
                    categories: [],

                }}
                options={() => ({
                    swipeEnabled: false,
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                })} />
            <Drawer.Screen
                name="Trip"
                component={TripScreen}
                initialParams={{
                    data: data,
                    startLocation: '',
                    endLocation: '',
                    startDate: '',
                    endDate: '',
                    dayLoad: '',
                    categories: [],
                }}
                options={() => ({
                    swipeEnabled: false,
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                })} />
            <Drawer.Screen
                name="Sign Up"
                component={SignInScreen}
                options={() => ({
                    swipeEnabled: false,
                    drawerLabel: () => null,
                    title: null,
                    drawerIcon: () => null
                })} />
            <Drawer.Screen
                name="Log Out"
                component={LogInScreen}
                options={() => ({
                    swipeEnabled: false })} />
        </Drawer.Navigator>
    );
};

export default AppNavigation;