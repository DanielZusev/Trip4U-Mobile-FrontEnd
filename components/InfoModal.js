import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, SectionList } from 'react-native';
import Card from '../components/Card';
import XButton from './XButton';
import { Text, Divider } from 'react-native-elements';
import { NO_PIC } from '../constantValues/Images';
import ImageLoad from 'react-native-image-placeholder';
import Colors from '../constantValues/Colors';

const InfoModal = props => {
    const data = props.jsonData;
    const day = (props.day).substring(4);
    const title = props.title;

    const event = [title]; // 0 = title, 1 = label, 2 = score, 3 = image, 4 = intro

    function dataHandler() { //TODO Add properties to info Card **************
        const routeData = data.route;
        for (const item in routeData) {
            if (item.includes(day)) {
                const routeItems = data.route[item];
                for (const key in routeItems) {
                    const keys = routeItems[key];
                    if ((keys.name).includes(title)) {
                        event.push(keys.label, keys.score, keys.imageURL, keys.intro)
                        return
                    }
                }
            }
        }
    }
    dataHandler();

    const Sections = [
        {
            title: "Categories",
            data: [event[1]]
        },
        {
            title: "Intro",
            data: [event[4]]
        },
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.centeredView}>
            <Card style={styles.card}>
                <ImageLoad
                    source={event[3] === null ? NO_PIC : { uri: event[3] }}
                    style={styles.image}
                    loadingStyle={{ size: 'large', color: Colors.logo }}
                >
                    <XButton OnPressButton={() => props.onChange(false)} />
                </ImageLoad>
                
                <View style={styles.innerInfo}>
                    <Text h3>{event[0]}</Text>
                    <Divider style={{ backgroundColor: 'black', height: 2, width: '90%' }} />
                    <Text >{Math.round(event[2] * 100) / 100} ⭐</Text>
                    <Divider style={{ backgroundColor: 'white', height: 30, width: '90%' }} />
                    <SectionList
                        style={styles.section}
                        sections={Sections}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item title={item} />}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.header}>{title}</Text>
                        )}
                    />
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 50
    },
    card: {
        flex: 1,
        padding: 1,
        height: '70%',
        margin: 50,
    },
    image: {
        resizeMode: 'stretch',
        width: '100%',
        height: 200,
        marginBottom: 5,
        borderRadius: 25,
        overflow: 'hidden'
    },
    imageStyle: {
       
    },
    item: {
        width: '90%',
    },
    header: {
        fontSize: 25,
    },
    title: {
        fontSize: 13,
        width: '90%',
    },
    section: {
        maxWidth: 360,
        marginBottom: 10
    },
    innerInfo: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        padding: 5
    }
});

export default InfoModal;