import React, { Component } from "react";
import { StyleSheet, TextInput, Pressable, Text, View, } from "react-native";
import { db, auth } from '../firebase/config';
import NavegacionComentario from "../components/NavegacionComentario";

class NuevoComentario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: ""
        }
    }

    crearComentario() {
        db.collection('comentarios').add({
            owner: auth.currentUser.email,
            texto: this.state.comentario,
            createdAt: Date.now(),
        })
            .then(() => {
                this.setState({ comentario: "" }) 
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <View style={styles.conteiner}>
                <Text style={styles.title}> Nuevo comentario</Text>
                <TextInput style={styles.input} placeholder="Escribe tu comentario aqui" value={this.state.comentario} onChangeText={text => this.setState({ comentario: text })} />
                <Pressable style={styles.boton} onPress={() => this.crearComentario()}>
                    <Text> Comentar </Text>
                </Pressable>


                <Text style={styles.title}>Home</Text>
                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('HomeMenu')}>
                    <Text>Volver al Home</Text>
                </Pressable>

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
        padding: 10,
        backgroundColor: "#F5F5DC",
        
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