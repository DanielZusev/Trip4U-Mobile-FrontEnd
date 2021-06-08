import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import DrawerButton from '../components/DrawerButton';
import { ButtonGroup } from 'react-native-elements';
import Colors from '../constantValues/Colors';
import { CATEGORY } from '../constantValues/Images'
import TripTimeLine from '../components/TripTimeLine';
import TripMap from '../components/TripMap';
import TripEdit from '../components/TripEdit';
import axios from 'axios';
import { generateTrip, serverIp } from '../constantValues/Addresses';


const TripScreen = props => {

    const { data, startLocation, endLocation, startDate, endDate, dayLoad, categories} = props.route.params;

    const tripId = data.trip.tripId
    const email = data.trip.userId;
    const tripButtons = ['TimeLine', 'Map', 'Edit'];
    const [tripButtonIndex, setTripButtonIndex] = useState(0);

    const tripButtonHandler = (index) => {
        setTripButtonIndex(index);
    }

    // async function handleEditMode() {  //*****EDIT MODE FUNCTION
    //     const jData = JSON.stringify({
    //         "type": "EDIT",
    //         "moreDetails": {
    //             "trip": {
    //                 "startDate": "12/25/2020",
    //                 "endDate": "12/30/2020",
    //                 "categories": [
    //                     "art",
    //                     "hiking"
    //                 ],
    //                 "dayLoad": "INTENSE",
    //                 "startLocation": "53.471557,-2.247717",
    //                 "endLocation": "53.371833,-1.466437"
    //             }
    //         },
    //         "invokeBy": email,
    //         "elementId": tripId
    //     });
    //     const config = {
    //         method: 'post',
    //         url: serverIp + generateTrip,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: jData
    //     };

    //     await axios(config)
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 // props.navigation.navigate('Trip', { data: res.data });
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }
 
    // handleEditMode();


    return (
        <View style={styles.screen}>
            <ImageBackground source={CATEGORY} style={styles.image}>
                <DrawerButton OnPressButton={() => props.navigation.toggleDrawer()} />
                <View style={styles.content}>
                    {tripButtonIndex === 0 && (<TripTimeLine style={styles.timeLine} jsonData={data.trip} />)}
                    {tripButtonIndex === 1 && (<TripMap style={styles.timeLine} jsonData={data.trip} />)}
                    {tripButtonIndex === 2 && (<TripEdit style={styles.timeLine} jsonData={data.trip} />)}
                </View>
                <View>
                    <ButtonGroup
                        containerStyle={styles.tripButtons}
                        buttons={tripButtons}
                        onPress={tripButtonHandler}
                        selectedIndex={tripButtonIndex}
                        selectedButtonStyle={styles.buttonGroupStyle}
                    />
                </View>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

    },
    tripButtons: {
        width: '95%',
        backgroundColor: Colors.drawer,
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginBottom: 20

    },
    buttonGroupStyle: {
        backgroundColor: Colors.logo,
    },
    content: {
        flex: 1,
        width: '100%',
        height: '85%',
        justifyContent: "center",
        padding: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',

    },
    timeLine: {
        width: '100%'
    }
});

export default TripScreen;