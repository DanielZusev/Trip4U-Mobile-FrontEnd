import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Text, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/Card';
import Colors from '../constantValues/Colors';
import CustomButton from '../components/CustomButton';

import { GOOGLE_PLACES_API_KEY } from '../constantValues/Credentials';
import axios from 'axios';
import { DND } from '../constantValues/Images'


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
    const [searchKeyword1, setSearchKeyword1] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isShowingResults, setIsShowingResults] = useState(false);
    const [isFirstSearchBar, setFirstSearchBar] = useState(true); // true = first, false = second (searchBar)
    const [startPoint, setStartPoint] = useState('');
    const [endPoint, setEndPoint] = useState('');

    const searchKeywordHandler = (keyWord) => {
        if (keyWord === '') {
            if (isFirstSearchBar)
                setSearchKeyword(keyWord);
            else
                setSearchKeyword1(keyWord);

            setSearchResults([]);
            setIsShowingResults(false);
        }
        else {
            if (isFirstSearchBar)
                setSearchKeyword(keyWord);
            else
                setSearchKeyword1(keyWord);

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
        if (isStart)
            setStartOrEndDate(1);
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
    };

    const nextButtonHandler = () => {
        if (searchKeyword != '' && searchKeyword1 != '' && startDate != null && endDate != null)
            props.navigation.navigate('Categories', { startPoint: startPoint, endPoint: endPoint, startDate: startDate, endDate: endDate })
        else
            Alert.alert(
                'Did you fill all fields ?',
                'One of the fields is empty\nplease fill them up',
                [{ text: 'OK', style: 'destructive' }]);
    };

    const searchLocation = async (text) => { // Google places API call
        axios
            .request({
                method: 'post',
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_PLACES_API_KEY}`,
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

    const pointHandler = (id) => {
        if (isFirstSearchBar)
            setStartPoint(id)
        else
            setEndPoint(id);
    }

    return (
        <KeyboardAvoidingView style={styles.screen} behavior="height">
            <ImageBackground source={DND} style={styles.image}>
                <View style={styles.secondScreen}>
                    <Card style={styles.card}>
                        <View style={styles.autocompleteContainer}>
                            <SearchBar
                                containerStyle={styles.searchBar1}
                                inputContainerStyle={styles.searchBarInput}
                                placeholder="Start From"
                                placeholderTextColor='grey'
                                onChangeText={searchKeywordHandler}
                                onClear={resetDestinationInputValues}
                                value={searchKeyword}
                                round={true}
                                lightTheme={true}
                                onFocus={() => { setFirstSearchBar(true) }} />

                            <SearchBar
                                containerStyle={styles.searchBar2}
                                inputContainerStyle={styles.searchBarInput}
                                placeholder="End In"
                                placeholderTextColor='grey'
                                onChangeText={searchKeywordHandler}
                                onClear={resetDestinationInputValues}
                                value={searchKeyword1}
                                round={true}
                                lightTheme={true}
                                onFocus={() => { setFirstSearchBar(false) }} />

                            {isShowingResults && (
                                <FlatList
                                    data={searchResults}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity
                                                id={item.place_id}
                                                style={styles.resultItem}
                                                onPress={() => {
                                                    searchKeywordHandler('');
                                                    if (isFirstSearchBar)
                                                        setSearchKeyword(item.description);
                                                    else
                                                        setSearchKeyword1(item.description);
                                                    pointHandler(item.place_id);
                                                }
                                                }>
                                                <Text style={{ color: 'white' }}>{item.description}</Text>
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
                                    {/* <DateTimePickerModal
                                        isVisible={isDatePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                        minimumDate={startDate} /> */}
                                    
                                </View>
                            </Card>}
                        <View style={styles.button}><CustomButton onPress={nextButtonHandler} title="Next"></CustomButton></View>
                    </Card>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBar1: {
        width: '100%',
        backgroundColor: 'transparent',
        backfaceVisibility: 'hidden',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginTop: 10,
    },
    searchBar2: {
        width: '100%',
        backgroundColor: 'transparent',
        backfaceVisibility: 'hidden',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    searchBarInput: {
        backgroundColor: Colors.drawer,
    },
    card: {
        width: '90%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
        marginStart: 20,
        marginTop: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        elevation: 0
    },
    innerCard: {
        width: '90%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginBottom: 40,
        backgroundColor: 'rgba(1000,1000,1000,0.6)',

    },
    button: {
        width: '100%',
        height: 35,
        opacity: 0.9
    },
    dateButton: {
        width: '100%',
        opacity: 0.9
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
        width: '100%',
    },
    searchResultsContainer: {
        width: '91.5%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'relative',
        top: 5,
        marginStart: 13
    },
    resultItem: {
        width: '100%',
        justifyContent: 'center',
        height: 50,
        borderBottomColor: Colors.drawer,
        borderBottomWidth: 1,
        paddingLeft: 15,
        padding: 20,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
});

export default DateNDestionationScreen;