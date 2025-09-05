import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
// import { FontAwesome5 } from '@expo/vector-icons';


type Props = {
    product: { id: string; title: string; price: number };
};

export default function ProductRow({ product }: Props) {
    const dispatch = useDispatch();

    return (
        <View style={styles.row}>
            {/* <FontAwesome5 name="product-hunt" size={24} color="#fff" /> */}
            <View style={{ flex: 1, paddingLeft: 16 }}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch(addToCart(product))}
            >
                <Text style={{ color: 'white' }}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: '#1d2a3b',
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignItems: 'center',
    },
    title: { color: 'white', fontWeight: '600', fontSize: 16 },
    price: { color: '#9fb2cc' },
    button: {
        backgroundColor: '#1e2d44',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
});
