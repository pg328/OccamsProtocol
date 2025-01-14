/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import TabThreeScreen from '../screens/TabThreeScreen';
import {BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList} from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator initialRouteName="TabOne" tabBarOptions={{activeTintColor: Colors[colorScheme].tint}}>
            <BottomTab.Screen
                name="A Workout "
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="logo-angular" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="B Workout"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="logo-bitcoin" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Initial Workout"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({color}) => <TabBarIcon name="fitness" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {name: React.ComponentProps<typeof Ionicons>['name']; color: string}) {
    return <Ionicons size={30} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="TabOneScreen"
                component={TabOneScreen}
                options={{headerTitle: 'Biceps, Triceps, Shoulders, Back'}}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="TabTwoScreen"
                component={TabTwoScreen}
                options={{headerTitle: 'Chest, Legs, Abs'}}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="TabThreeScreen"
                component={TabThreeScreen}
                options={{headerTitle: 'Initial Weight Setting'}}
            />
        </TabThreeStack.Navigator>
    );
}
