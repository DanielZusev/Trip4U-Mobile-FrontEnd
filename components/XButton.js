import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constantValues/Colors';

const XButton = props => {
    return (
        <TouchableHighlight
            style={{...styles.header, ...props.style}}
            activeOpacity={0.6}
            underlayColor={Colors.primary}
            onPress={props.OnPressButton}>
            <Icon style={styles.icon} name="close" color={props.iconColor} type='material' size={20}></Icon>
        </TouchableHighlight>


    );
};

const styles = StyleSheet.create({
    header: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '15%',
        flexDirection: 'column',
        marginTop: 20,
        padding: -1,
        borderWidth: 1,
        borderRadius: 30,
        alignSelf: 'flex-start',
        marginLeft: 10,
        backgroundColor: 'white'
    },
    icon: {
        
    }
});

export default XButton;