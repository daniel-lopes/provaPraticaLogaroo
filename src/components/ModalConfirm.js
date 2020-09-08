import React, { Component } from 'react';
import {
    Modal,
    Text,
    View,
    Alert,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

 export default class ModalConfirm extends Component {

 	constructor(props) {
        super(props);

        this.state = {
            modalVisible: this.props.visible
        };
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    butoms() {
    	if(this.props.confirm){
    		return (
    			<View style={styles.buttoms}>  
	    			<TouchableOpacity
	                    onPress={() => {
	                        setModalVisible(!this.state.modalVisible);
	                    }}>
	                    <Text style={[styles.btn, styles.btnCancel]}>Cancelar</Text>
	                </TouchableOpacity>
	                <TouchableOpacity
	                    onPress={() => {
	                        setModalVisible(false);
	                    }}>
	                    <Text style={[styles.btn, styles.btnOperation]}>Adicionar</Text>
	                </TouchableOpacity>
	            </View>
    		)
    	}

    	return (
			<View style={styles.buttoms}>
	    		<TouchableOpacity
	                onPress={() => {
	                    this.setModalVisible(false);
	                }}>
	                <Text style={[styles.btn, styles.btnOperation]}>Ok</Text>
	            </TouchableOpacity>
            </View>
    	)
    }

 	render(){

		return(
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
                        <Text style={styles.title}>{ this.props.title }</Text>
                        { this.butoms() }
                    </View>
                </View>
            </Modal>
		)
	}
}

const styles = StyleSheet.create({
    modal : {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
		textAlign: 'center'	
    },
    backgroundPost: {
        backgroundColor: '#fff',
        width: '80%',
        borderStyle: 'solid',
        borderColor: '#c3cfd8',
        borderWidth:  2,
        padding: 20
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
    btnOperation: {
        backgroundColor: '#e78444',
        color: '#fff'
    }
 })