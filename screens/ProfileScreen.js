import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Profile from '../components/Profile';

const ProfileScreen = props => {
    return (
        <View style={styles.screen}>
            <Profile
                onPressSignOut={() => props.navigation.navigate('LogInScreen')}
                onPressMyTrips={() => props.navigation.navigate('My Trips')}
                onPressShareTrip={() => props.navigation.navigate('')}
                onPressAccountSettings={() => props.navigation.navigate('')}
                onPressClearHistory={() => props.navigation.navigate('')} 
                toggleDrawer={() => props.navigation.toggleDrawer()}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
    },
});

export default ProfileScreen;