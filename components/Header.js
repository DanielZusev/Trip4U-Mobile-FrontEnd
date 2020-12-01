import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LOGO } from '../constantValues/Images';


const Header = props => {
    return (
        <View style={styles.header}>
            <Image style={styles.logoImage} source={LOGO}></Image>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 230,

    },
    logoImage: {
        width: '100%',
        height: 130,
        borderRadius: 35,
    },
});

export default Header;