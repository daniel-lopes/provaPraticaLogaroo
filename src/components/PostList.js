import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet, Button, TextInput, TouchableOpacity } from 'react-native';

import PostListItem from './PostListItem';
import ModalForm from './ModalForm';
import ModalConfirm from './ModalConfirm';

//backgroundColor: '#e2f9ff'
function PostList(props) {

    const [posts, setPosts] = useState([]);
    const [backupPosts, setBackupPosts] = useState([]);
    const [idPost, setIdPost] = useState(0);
    const [text, setText] = useState('');
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);
    const [showModalExclusion, setShowModalExclusion] = useState(false);
    const [canDelete, setCanDelete] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/posts'
                );
                const json = await response.json();
                setPosts(json);
                setIdPost(json.length + 1);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
        console.log("'>_<' --------> " + idPost);
    }, []);

    const confirm = (show, conf) => {
        console.log('O modal vai aparecer !!!!!!!!????????? '+ show)
        return(
            <ModalConfirm
                title="Post adicionado com sucesso!"
                visible = { show }
                confirm = { conf }
            />
        )   
    }

    const getId = () => {
        setIdPost(idPost + 1);
        return idPost;
    }

    const deletePost = async id => {
        await setShowModalExclusion(true);
        setShowModalExclusion(false);
        console.log('Posso deletar?')
        if(canDelete){
            console.log('Sim, delete por favor!')
            const newPosts = posts.filter( post => {
                return post.id != id;
            })
            setShowModalExclusion(false);
            setPosts(newPosts);
        } else {
            console.log('Cancelado pelo usuário')
        }

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

        const postsTemp = posts;
        postsTemp.unshift(newPoster)
        setPosts(postsTemp)
        setShowModalConfirm(true)
        setShowModalConfirm(false)  
    }

    const findPost = async () =>{
        let seachPosts = [];
        setText(text.toLocaleLowerCase());
        
        if(text.length){
            await fetch(`https://jsonplaceholder.typicode.com/posts?title=${text}`)
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    seachPosts = json;
                })

            if(backupPosts.length){
                setBackupPosts(posts);
            } 

            setPosts(seachPosts);

        } else if(backupPosts.length){
            setPosts(backupPosts)
            setBackupPosts([]);
        }
    }

    const textSeach = text => {
        setText(text)
    }

    const visibleModal = visible => {
        setVisibleModalForm(visible)
    }

	return (
        <View>
            <ModalForm 
                visible= { visibleModal }
                addPost = { addPost } 
            />
            <ModalConfirm
                title="Post adicionado com sucesso!"
                visible = { showModalConfirm }
                confirm = { null }

            />
            <ModalConfirm
                title="Deseja mesmo remover esse post?"
                visible = { showModalExclusion }
                confirm = { setCanDelete }
            />    
            {/* confirm(showModalConfirm) */}

            
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
    				data={posts}
    				renderItem={({ item }) => (
    					<PostListItem post={item} deletePost={ deletePost } />
    				)}
    				keyExtractor={ item => item.id.toString()}
                />
            </View>
        </View>
	);
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

export default PostList;