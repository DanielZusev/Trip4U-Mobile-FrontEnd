import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constantValues/Colors';
import { login, serverIp } from '../constantValues/Addresses';
import axios from 'axios';
import CustomButton from '../components/CustomButton';

import Header from '../components/Header';

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
                .get(serverIp + login + enteredEmail + '/' + enteredPassword)
                .then((res) => {
                    if (res.status === 200) {
                        //console.log(res.data);
                        props.navigation.replace('MainScreen',{email: enteredEmail, pass: enteredPassword, name: res.data.username.firstName});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    return (
        <KeyboardAvoidingView style={styles.screen}>
            <Header title="Trip4U" ></Header>
            <Card style={styles.card} >
                <Text style={styles.textHeader}>Welcome Back !</Text>
                <Input
                    style={styles.inputContainer}
                    autoCorrect={false}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={enteredEmail}
                    placeholderTextColor='grey'
                    onChangeText={emailInputHandler}
                    iconName='email'
                    iconColor='grey' />

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
                    iconColor='grey' />

            </Card>
            <View style={styles.button}><CustomButton onPress={loginHandler} title="Log In"></CustomButton></View>
            <Text style={styles.signIn} onPress={() => props.navigation.navigate('SignUpScreen')}>Not Signed In? Press Me</Text>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    inputContainer: {
        alignItems: 'center',
    },
    card: {
        width: '90%',
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        
    },
    button: {
        marginTop: 50,
        width: '70%',
        marginBottom: 10
    },
    signIn: {
        marginTop: 35,
        marginBottom: '40%',
        color: Colors.link,
        fontSize: 10,
        opacity: 40,
       
    },
    textHeader: {
        fontSize: 20,
        fontStyle: "italic",
    }
});

export default LogInScreen;