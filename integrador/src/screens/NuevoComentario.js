import React, { Component } from "react";
import { StyleSheet, TextInput, Pressable, Text, View, FlatList, } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";

class NuevoComentario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: "",
            comentarios: [],
        }
    }

    
    

    crearComentario() {
        db.collection('posts')
            .doc(this.props.route.params.id)
            .update({
                comentarios: firebase.firestore.FieldValue.arrayUnion({
                    email: auth.currentUser.email,
                    comentario: this.state.comentario,

                })
            })
            .then(response => {
                console.log('Comentario hecho')
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <Text style={styles.title}>Post</Text>
                <Text>{this.props.route.params.email}</Text>
                <Text>{this.props.route.params.msj}</Text>
                <Text>Likes: {this.props.route.params.likes.length}</Text>
                <Text style={styles.title}> Nuevo comentario</Text>
                <TextInput style={styles.input} placeholder="Escribe tu comentario aqui" value={this.state.comentario} onChangeText={text => this.setState({ comentario: text })} />
                <Pressable style={styles.boton} onPress={() => this.crearComentario()}>
                    <Text> Comentar </Text>
                </Pressable>


                <Text style={styles.title}>Home</Text>
                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('HomeMenu')}>
                    <Text>Volver al Home</Text>
                </Pressable>
                <Text>Comentarios: </Text>
                <FlatList
                    data = {this.props.route.params.comentarios}
                    keyExtractor={this.props.route.params.comentarios.comentario}
                    renderItem={({item}) => <Text>aa: {item.comentario}</Text>}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 7,
    },
    boton: {
        backgroundColor: 'orange',
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        marginBottom: 7,
        marginTop: 7,
    },
    boton2: {
        backgroundColor: 'lightblue',
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        marginTop: 9,
    },
    conteiner: {
        padding: 10
    },
    input: {
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 3,
        borderWidth: 2,
        padding: 8,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'semibold',
        marginBottom: 5,
        marginTop: 7,
    },
    error: {
        color: 'red'
    }

});

export default NuevoComentario