
import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Keyboard } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import Header from './components/Header';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';
import LogNSignInNavigation from './navigation/LogNSignInNavigation';
import AppNavigation from './navigation/AppNavigation';

const Stack = createStackNavigator();

export default function App() {

  // const [signInPage, setSignInPage] = useState(false);

  // const registrationHandler = (isPressedSignIn) => {
  //   setSignInPage(isPressedSignIn);
  // };

  // let content = <LogInScreen signIn={registrationHandler} />;

  // if (signInPage) {
  //   content = <SignUpScreen onBack={registrationHandler} />
  // }

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
