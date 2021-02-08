import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';

const MainScreen = props => {
    return (
        <View style={styles.screen}>
            <Header title="Trip4U" ></Header>
            <Card style={styles.card}>
                <Text style={styles.baseText}>Welcome Back User !</Text>
                <Text>Press The <Text style={styles.innerText}> Start </Text> Button To Begin</Text>
                <Text>Planning Your Trip</Text>
            </Card>
            <View style={styles.button}><CustomButton onPress={() => {}} title="Start"></CustomButton></View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 25
    },
    innerText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    baseText: {
        fontSize: 25,
        paddingBottom: 25
    },
    card: {
        width: '100%',
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
       
    },
    button: {
        marginTop: 50,
        width: '85%',
        marginBottom: 200,
    },
});

export default MainScreen;