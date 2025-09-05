import React from 'react';
import { View, Text, FlatList, ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { useOfflineUsers } from '../hooks/useOfflineUsers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

export default function UserListScreen() {
    const { users, loading, error } = useOfflineUsers();
    const navigation = useNavigation<NavProp>();

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#7aa2f7" />
            </View>
        );
    }


    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ color: 'white' }}>{error}</Text>
            </View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1520' }}>
            <FlatList
                data={users}
                keyExtractor={(item) => item?.id?.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row}
                        onPress={() => navigation.navigate('UserDetails', { user: item })}>
                        <Text style={styles.name}>{item?.name}</Text>
                        <Text style={styles.username}>@{item?.username}</Text>
                        <Text style={styles.email}>{item?.email}</Text>
                        <Text style={styles.address}>
                            {item?.address?.street}, {item?.address.city}
                        </Text>
                        <Text style={styles.company}>{item?.company?.name}</Text>
                    </TouchableOpacity>
                )}
            />

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    row: {
        padding: 16,
        borderBottomColor: '#1d2a3b',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    name: { color: 'white', fontWeight: '700', fontSize: 16 },
    username: { color: '#7aa2f7', fontSize: 14 },
    email: { color: '#9fb2cc', marginTop: 2 },
    address: { color: '#b0bec5', marginTop: 2 },
    company: { color: '#80cbc4', fontStyle: 'italic', marginTop: 4 },
});
