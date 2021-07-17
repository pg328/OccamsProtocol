import * as React from 'react';
import {useReducer} from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import TimerFunction from '../components/TimerFunction';
import {changeWeight, Collection, setStateFromFirebase} from '../components/utils';
import {Ionicons} from '@expo/vector-icons';
import {TextInput} from 'react-native-gesture-handler';
import WeightInfo from '../components/WeightInfo';

export default function TabOneScreen() {
    const [isRunning, setIsRunning] = useState<Boolean>(false);
    const [secondCount, setSecondCount] = useState<number>(0);

    useEffect(() => {
        setStateFromFirebase(setLPD, 'latPullDown');
        setStateFromFirebase(setSP, 'shoulderPress');
        if (isRunning)
            setTimeout(() => {
                setSecondCount((c) => c + 1);
            }, 1);
    }, [isRunning, secondCount]);

    const start = () => {
        setIsRunning(true);
        setSecondCount(0);
    };

    const [editing, setIsEditing] = useState<Boolean>(false);
    const edit = () => {
        setIsEditing(true);
    };
    const stopEdit = () => {
        changeWeight('latPullDown', lpd);
        changeWeight('shoulderPress', sp);
        setIsEditing(false);
    };

    const finish = () => {
        setIsRunning(false);
        return 'Finished!';
    };

    const [lpd, setLPD] = useState<Collection>();
    const [sp, setSP] = useState<Collection>();
    return (
        <View style={styles.container}>
            <TimerFunction {...{isRunning, secondCount, finish, start}}>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <WeightInfo editing={editing} weightTitle={'Lateral PullDown'} weightObject={lpd} setter={setLPD} />
                <WeightInfo editing={editing} weightTitle={'Shoulder Press'} weightObject={sp} setter={setSP} />
            </TimerFunction>
            {!isRunning ? (
                <TouchableOpacity
                    onPress={editing ? stopEdit : edit}
                    style={{
                        backgroundColor: 'blue',
                        borderRadius: 5,
                        marginTop: 100,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                    }}
                >
                    {!editing ? (
                        <>
                            <Text style={{...styles.title, color: 'white'}}>Edit</Text>
                            <Ionicons style={{marginLeft: 15}} name="create" size={20} color="white" />
                        </>
                    ) : (
                        <>
                            <Text style={{...styles.title, color: 'white'}}>Done</Text>
                            <Ionicons
                                style={{marginLeft: 15}}
                                name="checkmark-circle-outline"
                                size={20}
                                color="white"
                            />
                        </>
                    )}
                </TouchableOpacity>
            ) : (
                stopEdit()
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
