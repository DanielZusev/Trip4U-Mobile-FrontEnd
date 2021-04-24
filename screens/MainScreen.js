import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Header from '../components/Header';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { MAIN } from '../constantValues/Images';
import DrawerButton from '../components/DrawerButton';

const MainScreen = props => {

    const { email, pass, name } = props.route.params;

    return (
        <View style={styles.screen}>
            <ImageBackground source={MAIN} style={styles.image}>
                <DrawerButton OnPressButton={() => props.navigation.toggleDrawer()}/>
                <Header title="Trip4U" ></Header>
                <Card style={styles.card}>
                    <Text style={styles.baseText}>Welcome Back {name}!</Text>
                    <Text>Press The <Text style={styles.innerText}> Start </Text> Button To Begin</Text>
                    <Text>Planning Your Trip</Text>
                </Card>
                <View style={styles.button}>
                    <CustomButton onPress={() => { props.navigation.navigate('Date N Des'), { email: email, pass: pass } }} title="Start"></CustomButton>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

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
        width: '90%',
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        backgroundColor: 'rgba(0,0,0,0)',
        elevation: 0
    },
    button: {
        marginTop: 50,
        width: '85%',
        marginBottom: 150,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

export default MainScreen;