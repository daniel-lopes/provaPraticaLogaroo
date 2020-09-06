//import { StatusBar } from 'expo-status-bar';  <StatusBar style="auto" />
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostList from './src/components/PostList';

export default class App extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
                <Text>teste</Text>
                <PostList />    
            </View> 
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3c1a0',
    },
});
