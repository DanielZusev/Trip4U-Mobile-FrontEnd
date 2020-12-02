import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input'
import Colors from '../constantValues/Colors';
import { serverIp } from '../constantValues/Addresses';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

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

    const signUpHandler = () => {
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
            const newUser = {
                "email": enteredEmail,
                "password": enteredPassword,
                "role": "TOURIST",
                "username": {
                    "firstName": enteredFirstName,
                    "lastName": enteredLastName
                }
            };

            axios
                .post(serverIp + 'users/', newUser)
                .then((res) => {
                    if (res.status === 200) {
                        Alert.alert(
                            'Sign Up',
                            'Sign Up completed succesfully',
                            [{ text: 'OK', style: 'destructive', onPress: resetValues }]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

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
                    value={enteredFirstName}
                    onChangeText={firstNameInputHandler} 
                    iconName='face'
                    iconColor='grey'/>
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Last Name"
                    keyboardType="default"
                    placeholderTextColor='grey'
                    value={enteredLastName}
                    onChangeText={lastNameInputHandler}
                    iconName='face'
                    iconColor='grey' />
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Email Address"
                    keyboardType="email-address"
                    placeholderTextColor='grey'
                    value={enteredEmail}
                    onChangeText={emailInputHandler}
                    iconName='email'
                    iconColor='grey' />
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
                    iconColor='grey' />
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
                    iconColor='grey' />

            </Card>
            <View style={styles.button}><CustomButton title="Sign Up" onPress={signUpHandler}></CustomButton></View>
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
        height: 430,
        alignItems: 'center'
    },
    inputContainer: {
        alignItems: 'center',
        marginVertical: 5,
    },
    button: {
        marginTop: 15,
        width: '70%',
    }
});

export default SignUpScreen;