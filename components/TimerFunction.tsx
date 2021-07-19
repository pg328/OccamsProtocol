import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {View} from './Themed';
interface TFProps {
    isRunning: Boolean;
    secondCount: number;
    finish: () => string;
    start: () => void;
    children?: React.ReactNode;
}
const TimerFunction = ({isRunning, secondCount, finish, start, children}: TFProps) => {
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
                                : secondCount < 82
                                ? 'Rep ' + (1 + Math.floor((secondCount - 5) / 11))
                                : secondCount < 262
                                ? `REST: ${Math.floor((180 + 82 - secondCount) / 60)}:${
                                      (180 + 82 - secondCount) % 60 < 10 ? '0' : ''
                                  }${(180 + 82 - secondCount) % 60} left`
                                : finish()}
                        </Text>
                        {secondCount >= 5 && secondCount < 82 && (
                            <Text
                                style={{
                                    fontSize: 40,
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                {11 - ((secondCount - 5) % 11) <= 5
                                    ? 'DOWN'
                                    : 11 - ((secondCount - 5) % 11) === 6
                                    ? 'PAUSE'
                                    : 'UP'}
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
                            {secondCount < 82 &&
                                `Timer: ${Math.floor((180 + 82 - secondCount) / 60)}:${
                                    (180 + 82 - secondCount) % 60 < 10 ? '0' : ''
                                }${(180 + 82 - secondCount) % 60} left`}
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
