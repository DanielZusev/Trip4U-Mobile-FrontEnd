import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native'
import { Icon } from 'react-native-elements';

const Input = props => {
    return (
        <View style={styles.view}>
            <Icon style={styles.icon} name={props.iconName} color={props.iconColor} type='material'></Icon>
            <TextInput {...props} style={{ ...styles.input, ...props.style }} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25,
        marginLeft: 5,
        marginRight: 10
    },
    view: {
        flexDirection: 'row',
    }
});

export default Input;