import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Products') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'cart' : 'cart-outline';
                        }

                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    headerShown: true,
                    tabBarStyle: { backgroundColor: '#0b1520' },
                    tabBarActiveTintColor: '#7aa2f7',

                })}
            >
                <Tab.Screen name="Products" component={ProductListScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
