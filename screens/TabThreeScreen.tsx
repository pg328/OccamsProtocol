import * as React from 'react';
import {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import TimerFunction from '../components/TimerFunction';
import {changeWeight, Collection, setStateFromFirebase} from '../components/utils';
import WeightInfo from '../components/WeightInfo';
import {Ionicons} from '@expo/vector-icons';

export default function TabTwoScreen() {
    const [isRunning, setIsRunning] = useState<Boolean>(false);
    const [secondCount, setSecondCount] = useState<number>(0);

    useEffect(() => {
        if (isRunning)
            setTimeout(() => {
                setSecondCount((c) => c + 1);
            }, 1000);
    }, [isRunning, secondCount]);

    const start = () => {
        setIsRunning(true);
        setSecondCount(0);
    };

    const finish = () => {
        setIsRunning(false);
        return 'Finished!';
    };

    const WAIT_PERIOD = 5;
    const REP_COUNT = 5;
    const UP = 1;
    const PAUSE = 0;
    const DOWN = 2;

    return (
        <View style={styles.container}>
            <>
                {isRunning ? (
                    <>
                        <Text
                            style={{
                                fontSize: 40,
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            {secondCount < WAIT_PERIOD
                                ? 'Get Ready!'
                                : secondCount < REP_COUNT * (UP + PAUSE + DOWN) + WAIT_PERIOD
                                ? 'Rep ' + (1 + Math.floor((secondCount - WAIT_PERIOD) / (UP + PAUSE + DOWN)))
                                : secondCount < REP_COUNT * (UP + PAUSE + DOWN) + WAIT_PERIOD + 60
                                ? `REST: ${
                                      REP_COUNT * (UP + PAUSE + DOWN) + WAIT_PERIOD + 60 - secondCount
                                  } seconds left...`
                                : finish()}
                        </Text>
                        {secondCount >= WAIT_PERIOD && secondCount < REP_COUNT * (UP + PAUSE + DOWN) + WAIT_PERIOD && (
                            <Text
                                style={{
                                    fontSize: 40,
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                {UP + PAUSE + DOWN - ((secondCount - WAIT_PERIOD) % (UP + PAUSE + DOWN)) <= UP
                                    ? 'UP'
                                    : UP + PAUSE + DOWN - ((secondCount - WAIT_PERIOD) % (UP + PAUSE + DOWN)) ===
                                      UP + PAUSE
                                    ? 'PAUSE'
                                    : 'DOWN'}
                            </Text>
                        )}
                        <Text
                            style={{
                                fontSize: 20,
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            {secondCount < REP_COUNT * (UP + PAUSE + DOWN) + WAIT_PERIOD &&
                                'Timer: ' + (REP_COUNT * (UP + PAUSE + DOWN) + WAIT_PERIOD - secondCount) + ' seconds'}
                        </Text>
                    </>
                ) : (
                    <TouchableOpacity onPress={start} style={{backgroundColor: 'blue', borderRadius: 5}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            Start
                        </Text>
                    </TouchableOpacity>
                )}
            </>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={styles.title}> Initial Weight Setting</Text>
            {isRunning && (
                <>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <TouchableOpacity onPress={finish} style={{backgroundColor: 'red', borderRadius: 5}}>
                        <Text
                            style={{
                                fontSize: 20,
                                color: '#fff',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </>
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