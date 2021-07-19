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
    const addSetting = () => {
        setter({...weightObject, settings: [...(weightObject?.settings ? weightObject?.settings : []), '']});
    };
    const removeSetting = (index: number) => {
        setter({
            ...weightObject,
            settings: [
                ...(weightObject?.settings ? weightObject?.settings.slice(0, index) : []),
                ...(weightObject?.settings ? weightObject?.settings.slice(index + 1) : []),
            ],
        });
    };
    return editing ? (
        <>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20}}>
                <Text style={styles.title}>{weightTitle && weightTitle}: </Text>
                <TextInput
                    style={{
                        borderColor: '#f0f0f0',
                        height: 50,
                        borderWidth: 1,
                        width: 50,
                        paddingLeft: 10,
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    onChangeText={(text) => setter({...weightObject, weight: text})}
                    value={`${weightObject?.weight}`}
                ></TextInput>
                <Text style={styles.title}> kg</Text>
            </View>
            {weightObject?.settings?.length === 0 && (
                <TouchableOpacity onPress={addSetting} style={{marginLeft: 10}}>
                    <Ionicons style={{marginLeft: 15}} name="add-circle-outline" size={20} color="green" />
                </TouchableOpacity>
            )}
            {weightObject?.settings?.map((value, index) => (
                <View key={index} style={{display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 20}}>
                    <TouchableOpacity
                        onPress={() => removeSetting(index)}
                        style={{
                            marginRight: 10,
                        }}
                    >
                        <Ionicons style={{marginLeft: 15}} name="remove-circle-outline" size={20} color="red" />
                    </TouchableOpacity>
                    <Text>Setting:</Text>
                    <TextInput
                        style={{
                            borderColor: '#f0f0f0',
                            height: 50,
                            borderWidth: 1,
                            width: 50,
                            paddingLeft: 10,
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        onChangeText={(text) =>
                            setter({
                                ...weightObject,
                                settings: [
                                    ...(weightObject.settings ? weightObject.settings.slice(0, index) : []),
                                    text,
                                    ...(weightObject.settings ? weightObject.settings.slice(index + 1) : []),
                                ],
                            })
                        }
                        value={`${value}`}
                    ></TextInput>
                    <TouchableOpacity onPress={addSetting} style={{marginLeft: 10}}>
                        <Ionicons style={{marginLeft: 15}} name="add-circle-outline" size={20} color="green" />
                    </TouchableOpacity>
                </View>
            ))}
        </>
    ) : (
        <>
            <Text style={{...styles.title, margin: 20}}>
                {weightTitle}: {weightObject?.weight || '__'} kg
            </Text>
            {weightObject?.settings?.map((value, index) => (
                <Text key={index}>{value && `Setting: ${value}`}</Text>
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
