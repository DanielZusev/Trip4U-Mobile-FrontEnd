import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import Colors from '../constantValues/Colors';

const DrawerButton = props => {
    return (
        <TouchableHighlight
            style={{...styles.header, ...props.style}}
            activeOpacity={0.6}
            underlayColor={Colors.primary}
            onPress={props.OnPressButton}>
            <Icon style={styles.icon} name="notes" color={props.iconColor} type='material' size={30}></Icon>
        </TouchableHighlight>


    );
};

const styles = StyleSheet.create({
    header: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '15%',
        flexDirection: 'column',
        marginTop: 40,
        padding: 0,
        borderColor: Colors.logo,
        borderWidth: 0.5,
        borderRadius: 30,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    icon: {
        
    }
});

export default DrawerButton;