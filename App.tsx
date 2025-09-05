import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, } from 'react-native';
import LargeListScreen from './src/screens/LargeListScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'} />
      {/* <LargeListScreen /> */}
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b1520',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
