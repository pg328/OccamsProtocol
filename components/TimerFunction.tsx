import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {View} from './Themed';
interface TFProps {
    isRunning: Boolean;
    secondCount: number;
    finish: () => string;
    start: () => void;
    children?: React.ReactNode;
    legPress?: Boolean;
}
const TimerFunction = ({isRunning, secondCount, finish, start, children, legPress = false}: TFProps) => {
    const WAIT_PERIOD = 5;
    const REP_COUNT = legPress ? 10 : 7;
    const DOWN = 5;
    const PAUSE = 1;
    const UP = 5;
    const TUT = REP_COUNT * (DOWN + PAUSE + UP) + WAIT_PERIOD;
    return (
        <>
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
                            {secondCount < 5
                                ? secondCount < 2
                                    ? 'Get Ready!'
                                    : secondCount === 3
                                    ? 'Get Ready: 2...'
                                    : secondCount === 4
                                    ? 'Get Ready: 1...'
                                    : 'Get Ready: 3...'
                                : secondCount < TUT
                                ? 'Rep ' + (1 + Math.floor((secondCount - WAIT_PERIOD) / (DOWN + PAUSE + UP)))
                                : secondCount < TUT + 180
                                ? `REST: ${Math.floor((180 + TUT - secondCount) / 60)}:${
                                      (180 + TUT - secondCount) % 60 < 10 ? '0' : ''
                                  }${(180 + TUT - secondCount) % 60} left`
                                : finish()}
                        </Text>
                        {secondCount >= 5 && secondCount < TUT && (
                            <Text
                                style={{
                                    fontSize: 40,
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                {secondCount < WAIT_PERIOD + UP
                                    ? 'UP'
                                    : DOWN +
                                          PAUSE +
                                          UP -
                                          ((secondCount - WAIT_PERIOD + UP + 1) % (DOWN + PAUSE + UP)) <=
                                      UP
                                    ? 'UP'
                                    : DOWN +
                                          PAUSE +
                                          UP -
                                          ((secondCount - WAIT_PERIOD + UP + 1) % (DOWN + PAUSE + UP)) ===
                                      UP + 1
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
                            {secondCount < TUT &&
                                `Timer: ${Math.floor((180 + TUT - secondCount) / 60)}:${
                                    (180 + TUT - secondCount) % 60 < 10 ? '0' : ''
                                }${(180 + TUT - secondCount) % 60} left`}
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
            {children}
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
        </>
    );
};
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

export default TimerFunction;
