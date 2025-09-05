import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import CartScreen from '../screens/CartScreen';
import UserListScreen from '../screens/UserListScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserDetailsScreen from '../screens/UserDetailsScreen';
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
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Products" component={ProductListScreen} />
                <Tab.Screen name="Cart" component={CartScreen} />
                <Tab.Screen name="Users" component={UsersStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

// const Tab = createBottomTabNavigator();

// export default function RootNavigator() {
//     return (
//         <NavigationContainer>
//             <Tab.Navigator
//                 screenOptions={({ route }) => ({
//                     // tabBarIcon: ({ focused, color, size }) => {
//                     //     let iconName;

//                     //     if (route.name === 'Products') {
//                     //         iconName = focused ? 'home' : 'home-outline';
//                     //     } else if (route.name === 'Cart') {
//                     //         iconName = focused ? 'cart' : 'cart-outline';
//                     //     }

//                     //     return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
//                     // },
//                     headerShown: true,
//                     tabBarStyle: { backgroundColor: '#0b1520' },
//                     tabBarActiveTintColor: '#7aa2f7',

//                 })}
//             >
//                 <Tab.Screen name="Products" component={ProductListScreen} />
//                 <Tab.Screen name="Cart" component={CartScreen} />
//                 <Tab.Screen name="Users" component={UserListScreen} />
//             </Tab.Navigator>
//         </NavigationContainer>
//     );
// }
