import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';


export default function UserDetailsScreen() {
    const route = useRoute<RouteProp<RootStackParamList, 'UserDetails'>>();
    const { user } = route.params;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1520', padding: 16 }}>
            <Text style={styles.name}>{user.name} (@{user.username})</Text>
            <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
            <Text style={styles.label}>Phone: <Text style={styles.value}>{user.phone}</Text></Text>
            <Text style={styles.label}>Website: <Text style={styles.value}>{user.website}</Text></Text>
            <Text style={styles.label}>Company: <Text style={styles.value}>{user.company.name}</Text></Text>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>
                {user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}
            </Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    name: { color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 12 },
    label: { color: '#9fb2cc', marginTop: 8, fontWeight: '600' },
    value: { color: 'white', fontWeight: '400' },
});