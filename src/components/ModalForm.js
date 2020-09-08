import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import ModalConfirm from './ModalConfirm';

export default class ModalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.visible,
            showModalConfirm: false,
            title: '',
            text: ''
        };
    }

    onChangeHandler(field, value){
        this.setState(
            prevState => ({
                [field]: value
            })
        )
    }

    setModalVisible(visible){
        this.setState({ modalVisible: visible });
    }

    save(){
        this.props.addPost (
            this.state.title,
            this.state.text
        );

        this.setModalVisible(false);
        this.onChangeHandler('showModalConfirm', true);
        this.setState({
            showModalConfirm: true,
        })
        console.log('Vai mostrar o modal???? ' + this.state.showModalConfirm)
    }

    render() {
        return (
            <View>
                <ModalConfirm
                    title="Post adicionado com sucesso!"
                    visible = { this.state.showModalConfirm }
                    key={1}
                />
                <Modal
                    style={styles.modal}
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.modal}>
                        <View style={styles.backgroundPost}>
                            <Text>+ Adicionar  novo post</Text>
                            <TextInput
                              style={ styles.input }
                              placeholder="Título"
                              onChangeText={value => this.onChangeHandler('title', value)}
                            />
                            <TextInput
                                style={ styles.input }
                                multiline={true}
                                numberOfLines={5}
                                textAlignVertical = "top"
                                placeholder="Texto"
                                onChangeText={value => this.onChangeHandler('text', value)}
                            />
                            <View style={styles.buttoms}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text style={[styles.btn, styles.btnCancel]}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.save()
                                    }}>
                                    <Text style={[styles.btn, styles.btnAdd]}>Adicionar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.btnModal}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    modal : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginTop: 15,
        paddingLeft: 10,
        paddingVertical: 5,
    },
    backgroundPost: {
        backgroundColor: '#fff',
        width: '80%',
        borderStyle: 'solid',
        borderColor: '#c3cfd8',
        borderWidth:  2,
        padding: 20,
        /* elevation: 1 */
    },
    buttoms: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
        marginBottom: 5
    },
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e78444'
    },
    btnCancel: {
        color: '#e78444',
        marginRight: 20
    },
    btnAdd: {
        backgroundColor: '#e78444',
        color: '#fff'
    },
    btnModal: {
        position: 'absolute', 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: '100%', 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8,
        top: (Dimensions.get('window').height * 0.97),
        zIndex: 1
    }
})