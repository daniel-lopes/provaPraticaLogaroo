import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import PostListItem from './PostListItem';
//backgroundColor: '#e2f9ff'
export default class PostList extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            posts: [] 
        };
    }

    altualizaState(id) {
    	console.log('-------------' + id)
    	console.log('state = ?' + this.state.posts)
    	const newPosts = this.state.posts.map( post => {
    		return post.id != id;
    	})
    	console.log('estou aqui?')
    	this.setState({
            posts: newPosts
        }); 	
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    posts: json
                }); 
                //console.log(this.state.posts)   
            })   
    }

	render(){
		return (
			<FlatList
				style={styles.container}
				data={this.state.posts}
				renderItem={({ item }) => (
					<PostListItem post={item} altualizaState={this.altualizaState} />
				)}
				keyExtractor={item => item.id.toString()} />
		);
	}
};

const styles = StyleSheet.create({
	container: {
		
	},
})

//export default PostList;