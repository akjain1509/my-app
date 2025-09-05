import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import ItemRow, { Item, ITEM_HEIGHT } from '../components/ItemRow';

const TOTAL = 5000;
const PAGE_SIZE = 50;

function makeWord(seed: number) {
    const syllables = ['lo', 'rem', 'ip', 'sum', 'do', 'lor', 'sit', 'amet', 'con', 'sec', 'te', 'tur'];
    return `${syllables[seed % syllables.length]}${syllables[(seed + 3) % syllables.length]}`;
}

function generateAllItems(count: number): Item[] {
    const arr: Item[] = new Array(count).fill(null).map((_, i) => {
        const w1 = makeWord(i);
        const w2 = makeWord(i + 7);
        return {
            id: String(i + 1),
            title: `${w1}-${w2} Item ${i + 1}`,
            subtitle: `This is a mock description for item ${i + 1}`,
        };
    });
    return arr;
}


const allItems = generateAllItems(TOTAL);

export default function LargeListScreen() {
    const [visibleData, setVisibleData] = useState<Item[]>(() => allItems.slice(0, PAGE_SIZE));
    const [loadingMore, setLoadingMore] = useState(false);
    const listRef = useRef<FlatList<Item>>(null);

    const keyExtractor = useCallback((item: Item) => item.id, []);

    const renderItem: ListRenderItem<Item> = useCallback(({ item }) => {
        return <ItemRow item={item} />;
    }, []);

    const getItemLayout = useCallback(
        (_: ArrayLike<Item> | null | undefined, index: number) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
        }),
        []
    );

    const onEndReached = useCallback(() => {
        if (loadingMore) return;
        setLoadingMore(true);
        setTimeout(() => {
            setVisibleData((prev) => {
                if (prev.length >= TOTAL) return prev; // all loaded
                const next = allItems.slice(0, Math.min(prev.length + PAGE_SIZE, TOTAL));
                return next;
            });
            setLoadingMore(false);
        }, 150);
    }, [loadingMore]);

    const ensureScrollToIndex = useCallback((targetIndex: number) => {
        if (targetIndex < visibleData.length) {
            try {
                listRef.current?.scrollToIndex({ index: targetIndex, animated: true, viewPosition: 0.5 });
            } catch (err) {
                listRef.current?.scrollToOffset({ offset: targetIndex * ITEM_HEIGHT, animated: true });
            }
            return;
        }

        const newLen = Math.min(TOTAL, targetIndex + 1);
        setVisibleData(prev => {
            if (prev.length >= newLen) return prev;
            return allItems.slice(0, newLen);
        });


        setTimeout(() => {
            try {
                listRef.current?.scrollToIndex({ index: targetIndex, animated: true, viewPosition: 0.5 });
            } catch (err) {
                listRef.current?.scrollToOffset({ offset: targetIndex * ITEM_HEIGHT, animated: true });
            }
        }, 80);
    }, [visibleData.length]);


    // const header = useMemo(
    //     () => (
    //         <View style={styles.header}>
    //             <Text style={styles.headerTitle}>Optimized Large List</Text>
    //             <Text style={styles.headerSubtitle}>5,000 items · PAGE_SIZE = {PAGE_SIZE}</Text>
    //             <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
    //                 <TouchableOpacity
    //                     onPress={() => ensureScrollToIndex(0)}
    //                     style={styles.button}
    //                 >
    //                     <Text style={styles.buttonText}>Top</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity
    //                     style={styles.button}
    //                     onPress={() => ensureScrollToIndex(2500)}
    //                 >
    //                     <Text style={styles.buttonText}>Go to #2501</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     ),
    //     []
    // );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Optimized Large List</Text>
                <Text style={styles.headerSubtitle}>5,000 items · PAGE_SIZE = {PAGE_SIZE}</Text>
                <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
                    <TouchableOpacity
                        onPress={() => ensureScrollToIndex(0)}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Top</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => ensureScrollToIndex(2500)}
                    >
                        <Text style={styles.buttonText}>Go to #2501</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                ref={listRef}
                data={visibleData}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                getItemLayout={getItemLayout}
                // ListHeaderComponent={header}
                initialNumToRender={20}
                maxToRenderPerBatch={24}
                updateCellsBatchingPeriod={16}
                windowSize={10}
                removeClippedSubviews
                onEndReached={onEndReached}
                onEndReachedThreshold={0.35}
                maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
            />
            {loadingMore && (
                <View style={styles.loadingBar}>
                    <Text style={{ color: 'white' }}>Loading more…</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0b1520' },
    header: {
        padding: 16,
        backgroundColor: '#0b1520',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#1d2a3b',
    },
    headerTitle: { color: 'white', fontSize: 20, fontWeight: '700' },
    headerSubtitle: { color: '#9fb2cc', marginTop: 4 },
    button: {
        backgroundColor: '#1e2d44',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    buttonText: { color: 'white', fontWeight: '600' },
    loadingBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingVertical: 8,
        alignItems: 'center',
        backgroundColor: '#132032cc',
    },
});