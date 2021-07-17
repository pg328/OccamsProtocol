import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Text, View} from './Themed';
import {Collection} from './utils';
import {Ionicons} from '@expo/vector-icons';

interface WeightInfoProps {
    editing?: Boolean;
    weightTitle?: string;
    weightObject?: Collection | undefined;
    setter: any;
}

const WeightInfo = ({editing, weightTitle, weightObject, setter}: WeightInfoProps) => {
    //const settingsLen = weightObject?.settings?.length;
    //const settingAdder = () => addSetting(docName, weightObject, settingsLen);
    return editing ? (
        <>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20}}>
                <Text style={styles.title}>{weightTitle && weightTitle}: </Text>
                <TextInput
                    style={{borderColor: '#f0f0f0', height: 50, borderWidth: 1, width: 50, paddingLeft: 10}}
                    onChangeText={(text) => setter({...weightObject, weight: text})}
                    value={`${weightObject?.weight}`}
                ></TextInput>
                <Text style={styles.title}> kg</Text>
            </View>
            {weightObject?.settings?.map((value, index) => (
                <Text key={index}>Setting: {value}</Text>
            ))}
        </>
    ) : (
        <>
            <Text style={{...styles.title, margin: 20}}>
                {weightTitle}: {weightObject?.weight || '__'} kg
            </Text>
            {weightObject?.settings?.map((value, index) => (
                <Text key={index}>Setting: {value}</Text>
            ))}
        </>
    );
};
export default WeightInfo;
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
