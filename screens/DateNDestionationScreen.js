import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/Card';
import Colors from '../constantValues/Colors';
import CustomButton from '../components/CustomButton';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GOOGLE_PLACES_API_KEY } from '../constantValues/Credentials';
import axios from 'axios';


const DateNDestionationScreen = props => {

    const { email, pass } = props.route.params;

    // DATE Picking Related Consts
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [startDateText, setStartDateText] = useState('Start Date');
    const [endDateText, setEndDateText] = useState('End Date');
    const [isStartOrEndDate, setStartOrEndDate] = useState(0);
    const [chooseDateButtonText, setChooseDateButtonText] = useState('Choose Start Date');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // SEARCH BAR Realted Consts
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isShowingResults, setIsShowingResults] = useState(false);

    const searchKeywordHandler = (keyWord) => {
        if (keyWord === '') {
            setSearchKeyword(keyWord);
            setSearchResults([]);
            setIsShowingResults(false);
        }
        else {
            setSearchKeyword(keyWord);
            searchLocation(keyWord);
        }
    }

    const searchResultsHandler = (results) => {
        setSearchResults(results);
    }

    const isShowingResultsHandler = (isShown) => {
        setIsShowingResults(isShown);
    }

    const chooseDateBtnHandler = (isStart) => { // change the text of the choose date button
        if (isStart)
            setChooseDateButtonText('Choose End Date');
        else
            setChooseDateButtonText('Choose Start Date');
    }

    const startOrEndDateHandler = (isStart) => { //boolean indicator for which date to pick now
        if (isStart) {
            setStartOrEndDate(1);
        }
        else
            setStartOrEndDate(0);
    }

    const startDateHandler = (date) => { // set start date text view
        setStartDate(new Date(date));
        setStartDateText(`Start: ${new Date(date).toDateString()}`);
    }
    const endDateHandler = (date) => { // set end date text view
        if (date != '') {
            setEndDate(new Date(date));
            setEndDateText(`End: ${new Date(date).toDateString()}`);
        }
        else
            setEndDateText('End Date');
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        if (isStartOrEndDate === 0) { // 0 = start, 1 = end
            startOrEndDateHandler(true);
            chooseDateBtnHandler(true);
            startDateHandler(date);
            endDateHandler('');
        }
        else {
            startOrEndDateHandler(false);
            chooseDateBtnHandler(false);
            endDateHandler(date);
        }
        hideDatePicker();
    };

    const resetDestinationInputValues = () => {
        searchKeywordHandler('');
        searchResultsHandler([]);
        isShowingResultsHandler(false);
    }

    const nextButtonHandler = () => {
        if (searchKeyword != '' && startDate != null && endDate != null)
            props.navigation.navigate('Categories')
        else
            Alert.alert(
                'Did you fill all fields ?',
                'One of the fields is empty\nplease fill them up',
                [{ text: 'OK', style: 'destructive' }]);
    }

    const searchLocation = async (text) => { // Google places API call
        axios
            .request({
                method: 'post',
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchKeyword}&key=${GOOGLE_PLACES_API_KEY}`,
            })
            .then((response) => {
                console.log(response)
                searchResultsHandler(response.data.predictions);
                isShowingResultsHandler(true)
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.screen} behavior="height">
            <View style={styles.secondScreen}>
                <Card style={styles.card}>
                    <View style={styles.autocompleteContainer}>
                        <SearchBar
                            containerStyle={styles.searchBar}
                            inputContainerStyle={styles.searchBarInput}
                            placeholder="Enter Your Destination"
                            placeholderTextColor='grey'
                            onChangeText={searchKeywordHandler}
                            onClear={resetDestinationInputValues}
                            value={searchKeyword}
                            round={true}
                            lightTheme={true}
                            onFocus={() => { }} />

                        {isShowingResults && (
                            <FlatList
                                data={searchResults}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity
                                            style={styles.resultItem}
                                            onPress={() => {
                                                searchKeywordHandler('');
                                                setSearchKeyword(item.description);
                                            }
                                            }>
                                            <Text>{item.description}</Text>
                                        </TouchableOpacity>
                                    );
                                }}
                                keyExtractor={(item) => item.id}
                                style={styles.searchResultsContainer}
                            />
                        )}
                    </View>
                    {!isShowingResults &&
                        <Card style={styles.innerCard}>
                            <View style={styles.datesInput}>
                                <Text >{startDateText}</Text>
                                <Text>{endDateText}</Text>
                                <View style={styles.dateButton}><CustomButton onPress={showDatePicker} title={chooseDateButtonText}></CustomButton></View>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                    minimumDate={startDate} />
                            </View>
                        </Card>}
                    <View style={styles.button}><CustomButton onPress={nextButtonHandler} title="Next"></CustomButton></View>
                </Card>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    searchBar: {
        width: '100%',
        backgroundColor: 'white',
        backfaceVisibility: 'hidden',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginTop: 10
    },
    searchBarInput: {
        backgroundColor: Colors.drawer,
    },
    card: {
        width: '100%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
    },
    innerCard: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginBottom: 40,
    },
    button: {
        width: '100%',
        height: 35
    },
    dateButton: {
        width: '100%',
    },
    secondScreen: {
        width: '100%',
    },
    datesInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: 100,
        paddingVertical: 25
    },
    innerInputCard: {
        width: '100%',
        height: 80
    },
    inputContainer: {
        width: '90%',
        height: 15

    },
    autocompleteContainer: {
        flex: 1,
        width: '100%'
    },
    searchResultsContainer: {
        width: '95%',
        height: 200,
        backgroundColor: '#fff',
        position: 'relative',
        top: 5,
    },
    resultItem: {
        width: '100%',
        justifyContent: 'center',
        height: 50,
        borderBottomColor: Colors.drawer,
        borderBottomWidth: 1,
        paddingLeft: 15,
        padding: 20
    },
});

export default DateNDestionationScreen;