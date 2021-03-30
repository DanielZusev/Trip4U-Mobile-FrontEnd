import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { CATEGORY } from '../constantValues/Images'
import Card from '../components/Card';
import CustomButton from '../components/CustomButton';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import Colors from '../constantValues/Colors';


const CategoriesScreen = props => {
    const { startPoint, endPoint, startDate, endDate } = props.route.params;
    console.log(startPoint + "  " +  endPoint+ "  " + startDate+ "  " +endDate)

    const dayLoadButtons = ['Calm', 'Medium', 'Intense'];

    const [dayLoadIndex, setDayLoadIndex] = useState(0);
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [isChecked3, setIsChecked3] = useState(false);
    const [isChecked4, setIsChecked4] = useState(false);
    const [isChecked5, setIsChecked5] = useState(false);
    const [isChecked6, setIsChecked6] = useState(false);
    const [isChecked7, setIsChecked7] = useState(false);
    const [isChecked8, setIsChecked8] = useState(false);

    const [checked, setChecked] = useState(0);

    const dayLoadIndexHandler = (index) => {
        setDayLoadIndex(index);
    }

    const categoriesHandler = (index) => {
        switch (index) {
            case 1: isChecked1 ? setIsChecked1(false) : setIsChecked1(true);
                    isChecked1 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 2: isChecked2 ? setIsChecked2(false) : setIsChecked2(true);
                    isChecked2 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 3: isChecked3 ? setIsChecked3(false) : setIsChecked3(true);
                    isChecked3 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 4: isChecked4 ? setIsChecked4(false) : setIsChecked4(true);
                    isChecked4 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 5: isChecked5 ? setIsChecked5(false) : setIsChecked5(true);
                    isChecked5 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 6: isChecked6 ? setIsChecked6(false) : setIsChecked6(true);
                    isChecked6 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 7: isChecked7 ? setIsChecked7(false) : setIsChecked7(true);
                    isChecked7 ? setChecked(checked - 1) : setChecked(checked + 1); break;
            case 8: isChecked8 ? setIsChecked8(false) : setIsChecked8(true);
                    isChecked8 ? setChecked(checked - 1) : setChecked(checked + 1); break;
        }
    }

    const nextButtonHandler = () => {
       
        if (checked >= 2)
            props.navigation.navigate('Build Trip')
        else
            Alert.alert(
                'Invaild Input',
                'Please check at least 2 categories',
                [{ text: 'OK', style: 'destructive' }]);
    };


    return (
        <View style={styles.screen}>
            <ImageBackground source={CATEGORY} style={styles.image}>
                <Card style={styles.card}>
                    <View style={styles.dayLoad}>
                        <Text style={styles.dayLoadHeader}>DayLoad</Text>
                        <ButtonGroup
                            containerStyle={styles.dayLoadButtons}
                            buttons={dayLoadButtons}
                            onPress={dayLoadIndexHandler}
                            selectedIndex={dayLoadIndex}
                            selectedButtonStyle={styles.buttonGroupStyle}
                        />
                    </View>

                    <Text style={styles.categoriesHeader}>Choose Your Intrest</Text>

                    <View style={styles.categories}>
                        <View >
                            <CheckBox
                                title='Hiking'
                                checked={isChecked1}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(1)}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Extreme'
                                checked={isChecked2}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(2)}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Culture'
                                checked={isChecked3}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(3)}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Shopping'
                                checked={isChecked4}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(4)}
                                textStyle={styles.checkBoxText}
                            />
                        </View>
                        <View >
                            <CheckBox
                                title='Museums'
                                checked={isChecked5}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(5)}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Food'
                                checked={isChecked6}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(6)}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Relaxing'
                                checked={isChecked7}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(7)}
                                textStyle={styles.checkBoxText}
                            />
                            <CheckBox
                                title='Casino'
                                checked={isChecked8}
                                iconType='material-community'
                                checkedIcon='checkbox-intermediate'
                                uncheckedIcon='checkbox-blank-outline'
                                checkedColor={Colors.primary}
                                containerStyle={styles.checkBox}
                                onPress={() => categoriesHandler(8)}
                                textStyle={styles.checkBoxText}
                            />
                        </View>
                    </View>

                </Card>
                <View style={styles.button}><CustomButton onPress={nextButtonHandler} title="Next"></CustomButton></View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%'
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
        height: '70%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.1)',
        elevation: 0
    },
    button: {
        width: '80%',
        height: 80,
        opacity: 0.9,
        marginTop: 10
    },
    dayLoad: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
    },
    categories: {
        flex: 2,
        flexDirection: 'row',
        marginTop: 10

    },
    dayLoadButtons: {
        width: '100%',
        backgroundColor: Colors.drawer,
        borderRadius: 25,
    },
    buttonGroupStyle: {
        backgroundColor: Colors.logo,
    },
    checkBox: {
        backgroundColor: 'transparent',
        borderRadius: 25,
        margin: 10,
    },
    dayLoadHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    categoriesHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white'
    },
    checkBoxText: {
        color: 'white'
    }
});

export default CategoriesScreen;