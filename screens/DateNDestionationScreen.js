import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Text, FlatList, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Card from '../components/Card';
import Colors from '../constantValues/Colors';
import CustomButton from '../components/CustomButton';
import CustomDatePicker from '../components/CustomDatePicker';
import { GOOGLE_PLACES_API_KEY } from '../constantValues/Credentials';
import axios from 'axios';
import { DND } from '../constantValues/Images'
import DrawerButton from '../components/DrawerButton';


const DateNDestionationScreen = props => {

    const { email, pass } = props.route.params;

    // DATE Picking Related Consts
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDatesOk, setDatesOk] = useState(false);

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


    const resetDestinationInputValues = () => {
        searchKeywordHandler('');
        searchResultsHandler([]);
        isShowingResultsHandler(false);
    };

    const nextButtonHandler = () => {
        if (searchKeyword != '' && searchKeyword1 != '' && startDate != '' && endDate != '' && isDatesOk)
            props.navigation.navigate('Categories', {
                startPoint: startPoint,
                endPoint: endPoint,
                startDate: startDate,
                endDate: endDate,
            })
        else
            Alert.alert(
                'Did you fill all fields ?',
                'One of the fields is empty\nplease fill them up',
                [{ text: 'OK', style: 'destructive' }]);
    };

    const searchLocation = async (text) => { // Google places API call
        await axios
            .request({
                method: 'post',
                url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_PLACES_API_KEY}`,
            })
            .then((response) => {
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

    const handelDate = (isStartDate, value) => {
        if (isStartDate) {
            setStartDate(value);
            setEndDate(value);
        }
        else
            checkEndDate(value);
    }

    const checkEndDate = (value) => {
        const newValue = value.split('/');
        const splittedStartDate = startDate.split('/');

        if (parseInt(newValue[0]) == parseInt(splittedStartDate[0])) {

            if (parseInt(newValue[1]) >= parseInt(splittedStartDate[1])) {
                setEndDate(value);
                setDatesOk(true);
            }
            else {
                Alert.alert(
                    'Wrong Input',
                    'End Date Cannot Be Befor Start Date',
                    [{ text: 'OK', style: 'destructive' }]);
                setDatesOk(false);
            }
        }
        else {
            if (parseInt(newValue[0]) > parseInt(splittedStartDate[0])) {
                setEndDate(value);
                setDatesOk(true);
            }

            else {
                Alert.alert(
                    'Wrong Input',
                    'End Date Cannot Be Befor Start Date',
                    [{ text: 'OK', style: 'destructive' }]);
                setDatesOk(false);
            }
        }
    }

    return (
        <KeyboardAvoidingView style={styles.screen} behavior="height">
            <ImageBackground source={DND} style={styles.image}>
                <DrawerButton style={{ marginTop: 60 }} OnPressButton={() => props.navigation.toggleDrawer()} />
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
                                                id={index}
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
                                    keyExtractor={(item) => item.place_id}
                                    style={styles.searchResultsContainer}
                                />
                            )}
                        </View>

                        {!isShowingResults &&
                            <Card style={styles.innerCard}>
                                <View style={styles.datesInput}>
                                    <Text style={{ color: Colors.logo, fontWeight: 'bold', fontSize: 20, }}>Start Date</Text>
                                    <CustomDatePicker
                                        style={{ width: '90%' }}
                                        onDateChange={(value) => { handelDate(true, value) }}
                                        textStyle={{ color: 'black', fontWeight: 'bold', fontSize: 15, }}
                                    />

                                    <Text style={{ color: Colors.logo, fontWeight: 'bold', fontSize: 20, }}>End Date</Text>
                                    <CustomDatePicker
                                        style={{ width: '90%' }}
                                        onDateChange={(value) => { handelDate(false, value) }}
                                        textStyle={{ color: 'black', fontWeight: 'bold', fontSize: 15, }}
                                    />
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
        // marginTop: 10,
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
        height: '92%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
        marginStart: 20,
        marginTop: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        elevation: 0
    },
    innerCard: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        elevation: 0,

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
        height: '95%'
    },
    datesInput: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: 100,
        paddingVertical: 10
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