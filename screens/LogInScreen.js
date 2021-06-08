import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, ImageBackground } from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constantValues/Colors';
import { login, serverIp } from '../constantValues/Addresses';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import { LOGIN } from '../constantValues/Images'

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


    const loginHandler = async () => {
        if (enteredEmail === '' || enteredPassword === '') {
            Alert.alert(
                'Invaild Input',
                'One of the fields is empty\nplease fill them up',
                [{ text: 'OK', style: 'destructive', onPress: resetValues }]);
        } else {
            await axios
                .get(serverIp + login + enteredEmail + '/' + enteredPassword)
                .then((res) => {
                    if (res.status === 200) {
                        //console.log(res.data);
                        props.navigation.navigate('Main', { email: enteredEmail, pass: enteredPassword, name: res.data.username.firstName });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };


    return (
        <KeyboardAvoidingView style={styles.screen}>
            <ImageBackground source={LOGIN} style={styles.image}>
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
                        iconColor='black' />

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
                        iconColor='black' />

                </Card>
                <View style={styles.button}><CustomButton onPress={loginHandler} title="Log In"></CustomButton></View>
                <Text style={styles.signIn} onPress={() => props.navigation.navigate('Sign Up')}>Not Signed In? Press Me</Text>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white',
    },
    inputContainer: {
        alignItems: 'center',
        borderBottomColor: 'black',
    },
    card: {
        width: '90%',
        height: 230,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 150,
        opacity: 0.7

    },
    button: {
        marginTop: 50,
        width: '70%',
        marginBottom: 10,
        opacity: 0.9
    },
    signIn: {
        marginTop: 20,
        marginBottom: '40%',
        color: Colors.link,
        fontSize: 10,
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

export default LogInScreen;