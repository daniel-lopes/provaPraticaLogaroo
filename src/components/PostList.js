import React from 'react';
import { FlatList, Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';

import PostListItem from './PostListItem';
import ModalForm from './ModalForm';

//backgroundColor: '#e2f9ff'
export default class PostList extends React.Component {

	constructor(props) {
        super(props);

        this.state = {
            posts: [],
            backupPosts: [],
            id: 0,
            text: '',
            visibleModal: false
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    posts: json,
                    id: json.length,
                }); 
                //console.log(this.state.posts)   
            })   
    }

	render(){

        const getId = () => {
            this.setState({
                id: this.state.id + 1
            })
            return this.state.id;
        }

        const deletePost = id => {
            const newPosts = this.state.posts.filter( post => {
                return post.id != id;
            })

            this.setState({
                posts: newPosts
            });     
        }

        const addPost = async (title, text)=> {
            let newPoster = [];
            
            await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title || 'Sem título',
                    body: text || 'Sem texto',
                    userId: 1
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => {
                newPoster = json
                newPoster.id = getId()
            })

            const postsTemp = this.state.posts;
            postsTemp.unshift(newPoster)
            this.setState({
                posts: postsTemp
            });     
        }

        const findPost = async () =>{
            let seachPosts = [],
                text = this.state.text.toLocaleLowerCase();
            if(text.length){
                await fetch(`https://jsonplaceholder.typicode.com/posts?title=${text}`)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        seachPosts = json;
                    })

                if(!this.state.backupPosts.length){
                    this.setState({
                        backupPosts: this.state.posts
                    });
                } 

                this.setState({
                    posts: seachPosts
                });   

            } else if(this.state.backupPosts.length){
                console.log('entrou no else if')
                this.setState({
                    posts: this.state.backupPosts,
                    backupPosts: []
                });   
            }
        }

        const textSeach = text => {
            this.setState({
                text: text
            });   
        }

        const visibleModal = (visible) => {
            this.setState({
                visibleModal: visible
            });   
        }

		return (
            <View>          
                <ModalForm 
                    visible= { this.state.visibleModal }
                    addPost = { addPost } 
                    confirm = { false }
                /> 
                <View style={styles.container}> 
                    <View style={styles.searchSection}>
                        <TextInput
                          style={ styles.input }
                          onChangeText={text => textSeach(text)}
                        />
                        <TouchableOpacity style={styles.searchIcon} onPress={
                            () => { findPost() }
                        }>
                            <Text>Pesquisar</Text>    
                        </TouchableOpacity>
                    </View>
        			<FlatList
        				style={styles.list}
        				data={this.state.posts}
        				renderItem={({ item }) => (
        					<PostListItem post={item} deletePost={ deletePost } />
        				)}
        				keyExtractor={ item => item.id.toString()}
                    />
                </View>
            </View>
		);
	}
};

const styles = StyleSheet.create({
	container: {
        marginTop: 50,
        elevation: 1
    },
    list: {
		marginBottom: 150
	},
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
        borderStyle: 'solid',
        borderRadius: 3,
        borderColor: '#c3cfd8',
        borderWidth: 1
    },
    searchIcon: {
        flex: 1,
    },
    input: {
        flex: 4,
        /* backgroundColor: '#f00', */
        paddingRight: 5,
        paddingTop: 7,
        paddingBottom: 7,
        /* color: '#424242' */
    }
})

//export default PostList;