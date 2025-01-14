import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import TimerFunction from '../components/TimerFunction';
import {Collection, emptyCollection} from '../components/utils';
import WeightInfo from '../components/WeightInfo';
import {Ionicons} from '@expo/vector-icons';
import {get, set} from '../components/Storage';

export default function TabTwoScreen() {
    const [isRunning, setIsRunning] = useState<Boolean>(false);
    const [secondCount, setSecondCount] = useState<number>(0);

    useEffect(() => {
        get('benchPress').then((benchPress) => setBP(benchPress || emptyCollection));
        get('legPress').then((legPress) => setLP(legPress || emptyCollection));
        if (isRunning)
            setTimeout(() => {
                setSecondCount((c) => c + 1);
            }, 1000);
    }, [isRunning, secondCount]);

    const start = () => {
        setIsRunning(true);
        setSecondCount(0);
        editing && stopEdit();
    };

    const finish = () => {
        setIsRunning(false);
        return 'Finished!';
    };

    const [editing, setIsEditing] = useState<Boolean>(false);
    const edit = () => {
        setIsEditing(true);
    };
    const stopEdit = () => {
        set('benchPress', bp);
        set('legPress', lp);
        setIsEditing(false);
    };
    const [bp, setBP] = useState<Collection>(emptyCollection);
    const [lp, setLP] = useState<Collection>(emptyCollection);
    return (
        <View style={styles.container}>
            <TimerFunction {...{isRunning, secondCount, finish, start}}>
                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                <WeightInfo editing={editing} weightTitle={'Bench Press'} weightObject={bp} setter={setBP} />
                <WeightInfo editing={editing} weightTitle={'Leg Press'} weightObject={lp} setter={setLP} />
            </TimerFunction>
            {!isRunning && (
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
