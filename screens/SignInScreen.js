import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input'
import Colors from '../constantValues/Colors';

const SignInScreen = props => {
    return (
        <View style={styles.screen}>
            <Card style={styles.card}>
                <Text>Sign Up</Text>
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="First Name"
                    keyboardType="default"
                    placeholderTextColor='grey'
                    // value={enteredEmail}
                    /* onChangeText={emailInputHandler} */ />
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Last Name"
                    keyboardType="default"
                    placeholderTextColor='grey'
                    // value={enteredEmail}
                    /* onChangeText={emailInputHandler} */ />
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    placeholderTextColor='grey'
                    // value={enteredEmail}
                    /* onChangeText={emailInputHandler} */ />
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Password"
                    keyboardType="default"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    maxLength={12}
                    // value={enteredEmail}
                    /* onChangeText={emailInputHandler} */ />
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Re-Enter Password"
                    keyboardType="default"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    maxLength={12}
                    // value={enteredEmail}
                    /* onChangeText={emailInputHandler} */ />
                <View style={styles.button}><Button title="Sign Up" color={Colors.logo}></Button></View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 1,
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: 470,
        alignItems: 'center'
    },
    inputContainer: {
        alignItems: 'center',
        marginVertical: 5,
    },
    button: {
        marginTop: 15,
        width: '80%',
        backgroundColor: Colors.logo,
    }
});

export default SignInScreen;