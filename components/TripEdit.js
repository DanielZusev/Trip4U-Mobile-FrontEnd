import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const TripEdit = props => {
    return (
        <View style={styles.screen}>
            <Card style={styles.editCard}>
               
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    editCard: {
        width: '100%',
        height: '95%',
        elevation: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(1000,1000,1000,0.6)',
        alignContent: 'center',
        overflow: 'hidden'
    },
});

export default TripEdit;