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
        flex: 1,
        flexDirection: "column",
        width: '100%',
        alignItems: 'center',
        justifyContent: "center",
        padding: 1
    },
    logoImage: {
        width: '100%',
        height: 130,
        borderRadius: 35,
        alignItems: "center",
        marginTop: 100
    },
});

export default Header;