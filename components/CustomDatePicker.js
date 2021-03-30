import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Colors from '../constantValues/Colors';

const CustomDatePicker = props => {
    const { textStyle, defaultDate } = props;

    const [date, setDate] = useState(moment(defaultDate));
    const [show, setShow] = useState(false);

    const onChangeDate = (e, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(moment(selectedDate));
        }
    }

    const renderDatePicker = () => {
        return (
            <DateTimePicker
                value={new Date(date)}
                mode="date"
                // minimumDate={new Date(moment().subtract(1,'years').format('DD-MM-YYYY'))}
                // maximumDate={new Date(moment().format('DD-MM-YYYY'))}
                onChange={onChangeDate}
            />
        )
    }

    return (
        <TouchableHighlight
            {...props}
            style={{ ...styles.datePicker, ...props.style }}
            activeOpacity={0.6}
            underlayColor={Colors.drawer}
            onPress={() => setShow(true)}>

            <View style={styles.container}>
                <Icon style={styles.icon} name="date-range" color='red' type='material'></Icon>
                <Text style={textStyle}> {date.format('DD-MM-YYYY')} </Text>

                {show && renderDatePicker()}
            </View>

        </TouchableHighlight>
    );
};


const styles = StyleSheet.create({
    datePicker: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: Colors.logo,
        borderWidth: 1,
        width: '60%',
        borderRadius: 25,
    },
    icon: {
        marginHorizontal: 15
    },
    container: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        paddingHorizontal: 10,

    }
});

CustomDatePicker.defaultProps = {
    textStyle: {},
    defaultDate: moment(),
}

export default CustomDatePicker;