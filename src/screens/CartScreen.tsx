import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart, removeFromCart } from '../redux/slices/cartSlice';


export default function CartScreen() {
    const items = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1520' }}>
            <FlatList
                data={items}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>Cart is empty</Text>
                    </View>
                }
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.text}>{item.title} x {item.quantity}</Text>
                        <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                            <Text style={{ color: '#f77' }}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.footer}>
                <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                <TouchableOpacity style={styles.clearBtn} onPress={() => dispatch(clearCart())}>
                    <Text style={{ color: 'white' }}>Clear Cart</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: '#1d2a3b',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    text: { color: 'white' },
    footer: {
        padding: 16,
        borderTopColor: '#1d2a3b',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    total: { color: 'white', fontSize: 18, fontWeight: '700', marginBottom: 8 },
    clearBtn: { backgroundColor: '#1e2d44', padding: 12, borderRadius: 10, alignItems: 'center' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { color: '#9fb2cc' },
});
