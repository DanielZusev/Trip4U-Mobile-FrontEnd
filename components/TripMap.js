import React, { useState } from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import Card from './Card';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { GOOGLE_PLACES_API_KEY } from '../constantValues/Credentials';
import InfoModal from './InfoModal';

const TripMap = props => {
    const data = props.jsonData;
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [day, setDay] = useState('');

    let locations = [];
    let waypoints = [];

    const modalHandler = (day, title, isVisble) => {
        setDay(day);
        setTitle(title);
        setModalVisible(isVisble)
    }

    function dataHandler() {
        const routeData = data.route;
        for (const item in routeData) {
            const routeItems = routeData[item];
            for (const key in routeItems) {
                const keys = routeItems[key];
                locations.push({
                    day: item,
                    title: keys.name,
                    description: keys.label,
                    cordinates: {
                        latitude: keys.location.lat,
                        longitude: keys.location.lng,
                    }
                });
                waypoints.push({
                    latitude: keys.location.lat,
                    longitude: keys.location.lng,
                });
            }
        }
        waypoints = waypoints.slice(1, waypoints.length - 2)
    }
    dataHandler();


    return (
        <View>
            <Card style={styles.mapCard}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <InfoModal onChange={setModalVisible} jsonData={data} day={day} title={title} />
                </Modal>

                <MapView
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: locations[0].cordinates.latitude,
                        longitude: locations[0].cordinates.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.88,
                    }}
                    style={StyleSheet.absoluteFill} >

                    {locations.map((marker, index) => (
                        <Marker
                            key={index}
                            title={marker.title}
                            coordinate={marker.cordinates}
                            description={marker.description}
                            onCalloutPress={() => modalHandler(marker.day, marker.title, true)}
                        />
                    ))}

                    <MapViewDirections
                        origin={locations[0].cordinates}
                        destination={locations[locations.length - 1].cordinates}
                        waypoints={waypoints}
                        apikey={GOOGLE_PLACES_API_KEY}
                        strokeWidth={3}
                        strokeColor="red"
                    />
                </MapView>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    mapCard: {
        width: '100%',
        height: '95%',
        elevation: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(1000,1000,1000,0.6)',
        alignContent: 'center',
        overflow: 'hidden'
    },
});

export default TripMap;