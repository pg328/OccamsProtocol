import AsyncStorage from '@react-native-async-storage/async-storage';
import {Collection} from './utils';

export const set = async (key: string, value: Collection) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        // Error saving data
    }
};
export const get = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null && JSON.parse(value);
    } catch (error) {
        // Error retrieving data
        return "Error: AsyncStorage couldn't get your data";
    }
};
