import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../constantValues/Colors';

const CustomButton = props => {
    return(
        <TouchableOpacity style={{ ...styles.customButton, ...props.style }} onPress={props.onPress}>
            <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    customButton: {
        elevation: 5,
        backgroundColor: Colors.logo,
        borderRadius: 15,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',  
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        alignSelf: 'center',
        textTransform: "uppercase"
    }
});

export default CustomButton;