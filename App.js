//import { StatusBar } from 'expo-status-bar';  <StatusBar style="auto" />
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostList from './src/components/PostList';
import ModalForm from './src/components/ModalForm';

export default class App extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <PostList styles={styles.lista} />
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3c1a0',
        height: '100%'
    }
});