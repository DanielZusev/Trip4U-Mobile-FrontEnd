import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import LogInScreen from '../screens/LogInScreen';
import SignInScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen';
import Header from '../components/Header';

const Stack = createStackNavigator();

const LogNSignInNavigation = props => {

    return (
        <Stack.Navigator initialRouteName="LogInScreen">
            <Stack.Screen name="LogInScreen" component={LogInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUpScreen" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
};

export default LogNSignInNavigation;