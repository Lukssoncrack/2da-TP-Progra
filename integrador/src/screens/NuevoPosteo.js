import React, { Component } from "react";
import { StyleSheet, TextInput, Pressable ,Text , View, } from "react-native";
import { db, auth } from '../firebase/config'

class NuevoPosteo extends Component{
    constructor(props){
        super(props)
        this.state={
            message:'',
            error:'',
        }
    }
    onSubmit(message){
        console.log(this.state.message);
        message = this.state.message
        if(auth.currentUser){
            db.collection('posts')
            .add({
                email: auth.currentUser.email,
                message: this.state.message,
                createdAt: Date.now(),
                likes: [],
            })
             .then(response => {
                this.setState({posted: true})
                this.props.navigation.navigate('Home')
            })
            .catch(error => {
                this.setState({error: 'Fallo al crear el post'})
            })
        } else {
            this.setState({error: 'Debes estar logueado para crear un post'})
        }
    }
    

    
    render(){
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Nuevo Post</Text>

                <Pressable style={styles.btnSecondary} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.btnSecondaryText}>Volver al Home</Text>
                </Pressable>

                <Text style={styles.label}>Mensaje</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Escribí tu mensaje..."
                    onChangeText={text => this.setState({ message: text })}
                    value={this.state.message}
                />

                {this.state.error !== "" ? (
                    <Text style={styles.error}>{this.state.error}</Text>
                ) : null}

                <Pressable style={styles.btnPrimary} onPress={() => this.onSubmit()}>
                    <Text style={styles.btnPrimaryText}>Crear Post</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a1b7a1ff',
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 15,
        fontSize: 16,
        marginBottom: 15,
    },
    error: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    },
    btnPrimary: {
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    btnPrimaryText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    btnSecondary: {
        backgroundColor: "#E0E0E0",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 25,
    },
    btnSecondaryText: {
        color: "#333",
        fontSize: 15,
        fontWeight: "600",
    },
});

export default NuevoPosteo