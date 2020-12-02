
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import LogInScreen from './screens/LogInScreen';
import SignUpScreen from './screens/SignUpScreen';

export default function App() {

  const [signInPage, setSignInPage] = useState(false);

  const registrationHandler = (isPressedSignIn) => {
    setSignInPage(isPressedSignIn);
  };

  let content = <LogInScreen signIn={registrationHandler} />;

  if (signInPage) {
    content = <SignUpScreen />
  }

  return (
    <View>
      <Header title="Trip4U" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({

});
