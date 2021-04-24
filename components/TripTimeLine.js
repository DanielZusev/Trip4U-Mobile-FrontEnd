import React, { useState } from 'react';
import { View, StyleSheet, Modal, Alert } from 'react-native';
import Card from './Card';
import Timeline from 'react-native-timeline-flatlist'
import Colors from '../constantValues/Colors';
import InfoModal from './InfoModal';

const TripTimeLine = props => {
    const data = props.jsonData;
    const route = [];

    const [modalVisible, setModalVisible] = useState(false);
    const [day, setDay] = useState('');
    const [title, setTitle] = useState('');

    const modalVisabilityHandler = (isVisible, itemDay, itemTitle) => {
        setDay(itemDay);
        setTitle(itemTitle);
        setModalVisible(isVisible);
    }

    const jsonHandler = (day, title, description) => {
        const color = day === '1' ? Colors.day1 :
            day === '2' ? Colors.day2 :
                day === '3' ? Colors.day3 :
                    day === '4' ? Colors.day4 :
                        day === '5' ? Colors.day5 :
                            day === '6' ? Colors.day6 :
                                day === '7' ? Colors.day7 : Colors.drawer
        const temp = {
            time: 'Day ' + day,
            title: title,
            description: description,
            lineColor: color,
        }
        route.push(temp);
    }

    function dataHandler() {
        const routeData = data.route;
        for (const item in routeData) {
            const routeItems = data.route[item];
            for (const key in routeItems) {
                const keys = routeItems[key];
                jsonHandler(item, keys.name, keys.snippet);
            }
        }
    }

    dataHandler();

    return (
        <View>
            <Card style={styles.timeLineCard}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}>
                    <InfoModal onChange={setModalVisible} jsonData={data} day={day} title={title}/>
                </Modal>
                <Timeline
                    data={route}
                    circleSize={15}
                    innerCircle={'dot'}
                    circleColor='black'
                    lineColor={Colors.logo}
                    timeContainerStyle={{ minWidth: 42 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: Colors.logo, color: 'white', padding: 1, borderRadius: 20 }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: { paddingTop: 5 }
                    }}
                    onEventPress={(item) => modalVisabilityHandler(true, item.time, item.title)}
                />
            </Card>
        </View>
    );
}
const styles = StyleSheet.create({
    timeLineCard: {
        width: '100%',
        height: '95%',
        elevation: 0,
        alignItems: 'stretch',
        backgroundColor: 'rgba(1000,1000,1000,0.6)',
    },
    
})

export default TripTimeLine;