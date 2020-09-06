import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

//import { capitalizeFirstLetter } from '../util';

const deletePostItem = (id) => {
	fetch('https://jsonplaceholder.typicode.com/posts/'+ id, {
	  		method: 'DELETE',
		}).then(response => response.json())
	      .then(json => {
	  			console.log(json)
       	})
	console.log(`Post ${id} deletado`);
	return id;
}

const deletePost = (post) => {
	let del = false;
	console.log('Delentando post' + post.id)
	Alert.alert(
      'Delete Address',
      'Are you sure want to delete this post ' +post.id+ '?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => deletePostItem(post.id)},
      ],
      { cancelable: false }
    )		
}	

const PostListItem = props => {
	const { post, altualizaState } = props;
	const { id, title, body } = post;

	return (
		<View style={styles.container}>
			<View style={styles.titleMoreIcon}>
				<Text style={styles.title}>
					{ id }
				</Text>
				<TouchableOpacity style={styles.icon} onPress={
					() => {
							altualizaState(post.id)
						}
				}>
					<Text>X</Text>
	            </TouchableOpacity>
			</View>
			<Text style={styles.body}>
				{ body }
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 'auto',
		backgroundColor: '#fff',
		marginBottom: 20,
		marginLeft: 30,
		marginRight: 30
		/*alignItems: 'center',
		flexDirection: 'row',*/
	},
	titleMoreIcon: {
		flexDirection: 'row'
	},
	title: {
		fontSize: 20,
		paddingLeft: 15,
		marginBottom: 10,
		paddingTop: 10,
		flex: 11
	},
	icon: {
		flex: 1,
		paddingTop: 15
	},
	body: {
		paddingLeft: 15,
		paddingBottom: 20
	}
});
//{paddingLeft: 10,paddingRight:10}
export default PostListItem;