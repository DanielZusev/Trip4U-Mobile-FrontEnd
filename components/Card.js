import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
    return(
        <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
    );
   
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        alignItems: 'center',
        shadowColor: 'black', //Shadow Only On IOS
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.35,
        backgroundColor: 'white',
        elevation: 25, // Only on Android
        padding: 30,
        borderRadius: 25,
    }
});

export default Card;