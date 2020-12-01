import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../constantValues/Colors';


const LinkedText = props => {
    return(
    <Text style={{...styles.text, ...props.style}} onPress={() => {props.onPressSignIn(false)}}>{props.title} </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.link,
        fontSize: 10,
        opacity: 40,
    }
});

export default LinkedText;