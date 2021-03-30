import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomDatePicker from '../components/CustomDatePicker';

const BuildTripScreen = props => {
    return (
        <View style={styles.screen}>
           <CustomDatePicker></CustomDatePicker>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default BuildTripScreen;