import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';


const CategoriesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>My Trips</Text>
          
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingTop: 100,
        width: '100%'
    },
    
});

export default CategoriesScreen;