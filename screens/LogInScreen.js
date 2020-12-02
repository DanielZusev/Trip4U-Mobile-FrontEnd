import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input'
import Colors from '../constantValues/Colors';
import { serverIp } from '../constantValues/Addresses';
import axios from 'axios';
import CustomButton from '../components/CustomButton';

const LogInScreen = props => {

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const emailInputHandler = (inputEmail) => {
        setEnteredEmail(inputEmail);
    };
    const passwordInputHandler = (inputPassword) => {
        setEnteredPassword(inputPassword);
    };

    const resetValues = () => {
        setEnteredEmail('');
        setEnteredPassword('');
    };


    const loginHandler = () => {
        if (enteredEmail === '' || enteredPassword === '') {
            Alert.alert(
                'Invaild Input',
                'One of the fields is empty\nplease fill them up',
                [{ text: 'OK', style: 'destructive', onPress: resetValues }]);
        } else {
            axios
                .get(serverIp + 'users/login/' + enteredEmail + '/' + enteredPassword)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    return (
        <View style={styles.screen}>
            <Card style={styles.card} >
                <Text>Welcome Back !</Text>
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={enteredEmail}
                    placeholderTextColor='grey'
                    onChangeText={emailInputHandler} 
                    iconName='email'
                    iconColor='grey'/>

                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    maxLength={12}
                    placeholder="Password"
                    keyboardType="default"
                    value={enteredPassword}
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                    onChangeText={passwordInputHandler} 
                    iconName='lock'
                    iconColor='grey'/>


            </Card>
            <View style={styles.button}><CustomButton onPress={loginHandler} title="Log In"></CustomButton></View>
            <Text style={styles.signIn} onPress={() => props.signIn(true)}>Not Signed In? Press Me</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 1,
        alignItems: 'center',

    },
    inputContainer: {
        alignItems: 'center',
    },
    card: {
        width: '80%',
        height: 230,
        alignItems: 'center'
    },
    button: {
        marginTop: 50,
        width: '70%',
    },
    signIn: {
        marginTop: 50,
        color: Colors.link,
        fontSize: 10,
        opacity: 40,
    },

});

export default LogInScreen;