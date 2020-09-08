import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

//import { capitalizeFirstLetter } from '../util';

const PostListItem = props => {
	const { post, deletePost } = props;
	const { id, title, body } = post;

	return (
		<View style={styles.card}>
			<View style={styles.titleMoreIcon}>
				<Text style={styles.title}>
					{ id }
				</Text>
				<TouchableOpacity style={styles.icon} onPress={
					() => { deletePost(post.id) }
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
	card: {
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