import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { saveToken, getToken, deleteToken } from '../utils/secureToken';


export default function TokenScreen() {
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        (async () => {
            const stored = await getToken();
            if (stored) setToken(stored);
        })();
    }, []);


    const handleSave = async () => {
        await saveToken('dummy-auth-token-12345');
        const stored = await getToken();
        setToken(stored);
    };


    const handleClear = async () => {
        await deleteToken();
        setToken(null);
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Secure Token Storage</Text>
            <Text style={styles.token}>{token ? token : 'No token stored'}</Text>


            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Dummy Token</Text>
            </TouchableOpacity>


            <TouchableOpacity style={[styles.button, { backgroundColor: '#f77' }]} onPress={handleClear}>
                <Text style={styles.buttonText}>Clear Token</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0b1520' },
    title: { color: 'white', fontSize: 20, fontWeight: '700', marginBottom: 20 },
    token: { color: '#9fb2cc', marginBottom: 20 },
    button: { backgroundColor: '#1e2d44', padding: 12, borderRadius: 8, marginVertical: 8 },
    buttonText: { color: 'white' },
});