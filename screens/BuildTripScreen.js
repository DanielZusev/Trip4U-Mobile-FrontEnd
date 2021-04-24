import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { BUILDTRIP } from '../constantValues/Images';
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import axios from 'axios';
import { generateTrip, serverIp } from '../constantValues/Addresses';
import { GOOGLE_PLACES_API_KEY } from '../constantValues/Credentials';

const BuildTripScreen = props => {

    const { startPoint, endPoint, startDate, endDate, dayLoad, categories} = props.route.params;

    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    // console.log("SP:" + startPoint + " EP:" + endPoint + " SD:" + startDate + " ED:" + endDate + " DL:" + dayLoad + " C:" + categories)
    if (startPoint !== null && endPoint !== null) {
        handelPlaces(startPoint, true);
        handelPlaces(endPoint, false);
    }

  async function handelBuildForMe() {

        const data = JSON.stringify({
            "type": "GENERATE",
            "moreDetails": {
                "trip": {
                    "startDate": startDate,
                    "endDate": endDate,
                    "categories": categories,
                    "dayLoad": dayLoad,
                    "startLocation": startLocation,
                    "endLocation": endLocation
                }
            }
        });

        const config = {
            method: 'post',
            url: serverIp + generateTrip,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

       await axios(config)
            .then((res) => {
                if (res.status === 200) {
                    props.navigation.navigate('Trip', {
                        data: res.data,
                        startLocation: startLocation,
                        endLocation: endLocation,
                        startDate: startDate,
                        endDate: endDate,
                        dayLoad: dayLoad,
                        categories: categories,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

   async function handelPlaces(placeId, isStart) {
        const config = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,geometry&key=${GOOGLE_PLACES_API_KEY}`,
            headers: {}
        };

        await axios(config)
            .then((res) => {
                if (res.status === 200) {
                    const lat = res.data.result.geometry.location.lat;
                    const lng = res.data.result.geometry.location.lng;
                    let location = lat + "," + lng;

                    if (isStart)
                        setStartLocation(location);
                    else
                        setEndLocation(location);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleBuildByMayself = () => {
        console.log('self')
    }

    return (
        <View style={styles.screen}>
            <ImageBackground source={BUILDTRIP} style={styles.image}>
                <Header title="Trip4U" ></Header>
                <Card style={styles.card}>
                    <CustomButton style={styles.mainButton} onPress={handelBuildForMe} title="Build My Trip"></CustomButton>
                    <CustomButton style={styles.button} onPress={handleBuildByMayself} title="Build From Scratch"></CustomButton>
                </Card>

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    card: {
        width: '90%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0)',
        elevation: 0
    },
    button: {
        width: '70%',
    },
    mainButton: {
        width: '100%',
        height: '20%',

    }
});

export default BuildTripScreen;