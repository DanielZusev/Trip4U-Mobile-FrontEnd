import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input'
import { createNewUser, serverIp } from '../constantValues/Addresses';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import Header from '../components/Header';
import { SIGNIN } from '../constantValues/Images'

const SignUpScreen = props => {

    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLasName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredReEnteredPassword, setEnteredReEnteredPassword] = useState('');

    const firstNameInputHandler = (firstName) => {
        setEnteredFirstName(firstName);
    };

    const lastNameInputHandler = (lastName) => {
        setEnteredLasName(lastName);
    };

    const emailInputHandler = (inputEmail) => {
        setEnteredEmail(inputEmail);
    };

    const passwordInputHandler = (inputPassword) => {
        setEnteredPassword(inputPassword);
    };

    const reEnterPasswordInputHandler = (reEnterPassword) => {
        setEnteredReEnteredPassword(reEnterPassword);
    };

    const resetValues = () => {
        setEnteredFirstName('');
        setEnteredLasName('');
        setEnteredEmail('');
        setEnteredPassword('');
        setEnteredReEnteredPassword('');
    };

    const resetPasswords = () => {
        setEnteredPassword('');
        setEnteredReEnteredPassword('');
    };

    const signUpHandler = async () => {
        if (enteredFirstName === '' ||
            enteredLastName === '' ||
            enteredEmail === '' ||
            enteredPassword === '' ||
            enteredReEnteredPassword === '') {

            Alert.alert(
                'Invaild Input',
                'One of the fields is empty\nplease fill them up',
                [{ text: 'OK', style: 'destructive', onPress: resetValues }]);
        } else if (enteredPassword !== enteredReEnteredPassword) {
            Alert.alert(
                'Invaild Input',
                'Passwords Not Match',
                [{ text: 'OK', style: 'destructive', onPress: resetPasswords }]);
        } else {
            const newUserElement = {
                "email": enteredEmail,
                "password": enteredPassword,
                "role": "TOURIST",
                "username": {
                    "firstName": enteredFirstName,
                    "lastName": enteredLastName
                }
            };

            await axios
                .post(serverIp + createNewUser, newUserElement)
                .then((res) => {
                    if (res.status === 200) {
                        Alert.alert(
                            'Sign Up',
                            'Sign Up completed succesfully',
                            [{
                                text: 'OK',
                                style: 'destructive',
                                onPress: props.navigation.replace('MainScreen', { email: enteredEmail, pass: enteredPassword })
                            }]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <ImageBackground source={SIGNIN} style={styles.image}>
                <Header title="Trip4U" ></Header>
                <Card style={styles.card}>
                    <Text style={styles.textHeader}>Sign Up</Text>
                    <Input
                        style={styles.inputContainer}
                        autoCorrect={false}
                        placeholder="First Name"
                        keyboardType="default"
                        placeholderTextColor='grey'
                        value={enteredFirstName}
                        onChangeText={firstNameInputHandler}
                        iconName='face'
                        iconColor='black' />
                    <Input
                        style={styles.inputContainer}
                        autoCorrect={false}
                        placeholder="Last Name"
                        keyboardType="default"
                        placeholderTextColor='grey'
                        value={enteredLastName}
                        onChangeText={lastNameInputHandler}
                        iconName='face'
                        iconColor='black' />
                    <Input
                        style={styles.inputContainer}
                        autoCorrect={false}
                        placeholder="Email Address"
                        keyboardType="email-address"
                        placeholderTextColor='grey'
                        value={enteredEmail}
                        onChangeText={emailInputHandler}
                        iconName='email'
                        iconColor='black' />
                    <Input
                        style={styles.inputContainer}
                        autoCorrect={false}
                        placeholder="Password"
                        keyboardType="default"
                        placeholderTextColor='grey'
                        secureTextEntry={true}
                        maxLength={12}
                        value={enteredPassword}
                        onChangeText={passwordInputHandler}
                        iconName='lock'
                        iconColor='black' />
                    <Input
                        style={styles.inputContainer}
                        autoCorrect={false}
                        placeholder="Re-Enter Password"
                        keyboardType="default"
                        placeholderTextColor='grey'
                        secureTextEntry={true}
                        maxLength={12}
                        value={enteredReEnteredPassword}
                        onChangeText={reEnterPasswordInputHandler}
                        iconName='lock'
                        iconColor='black' />

                </Card>
                <View style={styles.button}><CustomButton title="Sign Up" onPress={signUpHandler}></CustomButton></View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '90%',
        height: 480,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: 100,
        marginBottom: 20,
        opacity: 0.7,
    },
    inputContainer: {
        alignItems: 'center',
        marginVertical: 5,
        borderBottomColor: 'black',
    },
    button: {
        marginTop: 15,
        width: '70%',
        marginBottom: 15,
        opacity: 0.9
    },
    textHeader: {
        fontSize: 20,
        fontStyle: "italic",
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

export default SignUpScreen;