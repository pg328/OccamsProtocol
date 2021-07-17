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
                                color: 'black',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            {secondCount < 5
                                ? 'Get Ready!'
                                : secondCount < 82
                                ? 'Rep ' + (1 + Math.floor((secondCount - 5) / 11))
                                : finish()}
                        </Text>
                        {secondCount >= 5 && secondCount < 82 && (
                            <Text
                                style={{
                                    fontSize: 40,
                                    color: 'black',
                                    paddingRight: 20,
                                    paddingLeft: 20,
                                    paddingTop: 10,
                                    paddingBottom: 10,
                                }}
                            >
                                {11 - ((secondCount - 5) % 11) <= 5
                                    ? 'UP'
                                    : 11 - ((secondCount - 5) % 11) === 6
                                    ? 'PAUSE'
                                    : 'DOWN'}
                            </Text>
                        )}
                        <Text
                            style={{
                                fontSize: 20,
                                color: 'black',
                                paddingRight: 20,
                                paddingLeft: 20,
                                paddingTop: 10,
                                paddingBottom: 10,
                            }}
                        >
                            {'Timer: ' + (82 - secondCount) + ' seconds'}
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
