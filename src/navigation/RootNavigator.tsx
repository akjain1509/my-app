import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import UserListScreen from '../screens/UserListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import TokenScreen from '../screens/TokenScreen';
import LargeListScreen from '../screens/LargeListScreen';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

export type RootStackParamList = {
    Products: undefined;
    Cart: undefined;
    UserList: undefined;
    UserDetails: { user: any };
};


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();


function UsersStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Users' }} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ title: 'User Details' }} />
        </Stack.Navigator>
    );
}


export default function RootNavigator() {
    return (
        <NavigationContainer
            linking={{
                prefixes: ['myapp://'],
                config: {
                    screens: {
                        UserDetails: 'user/:id',
                    },
                },
            }}
        >
            <Tab.Navigator screenOptions={{ headerShown: true }}>
                <Tab.Screen name="LargeListScreen" component={LargeListScreen} options={{ title: 'Large List' }} />
                <Tab.Screen name="Products" component={ProductListScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
                <Tab.Screen name="Users" component={UsersStack} options={{ headerShown: false }} />
                <Tab.Screen name="TokenScreen" component={TokenScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

