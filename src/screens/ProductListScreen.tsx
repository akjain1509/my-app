
import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import ProductRow from '../components/ProductRow';

const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
    id: String(i + 1),
    title: `Product ${i + 1}`,
    price: (i + 1) * 10,
}));

export default function ProductListScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0b1520' }}>
            <FlatList
                data={mockProducts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ProductRow product={item} />}
            />
        </SafeAreaView>
    );
}
