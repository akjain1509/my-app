import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type Item = {
    id: string;
    title: string;
    subtitle: string;
};

const ITEM_HEIGHT = 64;
export { ITEM_HEIGHT };

const ItemRow = memo(({ item }: { item: Item }) => {
    return (
        <View style={styles.row}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                    {item.subtitle}
                </Text>
            </View>
            <Text style={styles.badge}>#{item.id}</Text>
        </View>
    );
});


const styles = StyleSheet.create({
    row: {
        height: ITEM_HEIGHT,
        paddingHorizontal: 16,
        backgroundColor: '#0f1b2a',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#1d2a3b',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#1e2d44',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        color: '#b3c3d9',
        fontSize: 12,
    },
    badge: {
        color: '#7aa2f7',
        fontWeight: '700',
        marginLeft: 8,
    },
});


export default ItemRow;