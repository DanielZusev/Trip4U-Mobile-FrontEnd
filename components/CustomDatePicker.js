import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Icon } from 'react-native-elements';
import Colors from '../constantValues/Colors';

const CustomDatePicker = props => {
    const { textStyle, iconStyle, defaultDate } = props;

    const [date, setDate] = useState(moment(defaultDate));
    const [show, setShow] = useState(false);

    const onChangeDate = (e, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(moment(selectedDate));
            props.onDateChange(moment(selectedDate).format('MM/DD/YYYY'));
        }
    }

    const renderDatePicker = () => {
        return (
            <DateTimePicker
                timeZoneOffsetInMinutes={0}
                value={new Date(date)}
                mode="date"
                onChange={onChangeDate}
                minimumDate={new Date()}
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
                <Icon style={iconStyle} name="date-range" color='red' type='material'></Icon>
                <Text style={textStyle}> {date.format('MM/DD/YYYY')} </Text>

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
    container: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        paddingHorizontal: 10,

    }
});

CustomDatePicker.defaultProps = {
    textStyle: {},
    defaultDate: moment(),
    iconStyle: { marginHorizontal: 15 },
    onDateChange: () => { }
}

export default CustomDatePicker;