import React, { Component } from "react";
import { StyleSheet, TextInput, Pressable, Text, View, FlatList, } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";
import NavegacionComentario from "../components/NavegacionComentario";

class NuevoComentario extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comentario: "",
            comentarios: [],
        }
    }


    componentDidMount() {
        console.log(this.props.route.params)
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
                <Text style={styles.title}> Post</Text>
                <View style={styles.postContainer}>
                    <Text style={styles.postEmail}>{this.props.route.params.email}</Text>
                    <Text style={styles.postText}>{this.props.route.params.msj}</Text>
                    <Text style={styles.postMeta}>Likes: {this.props.route.params.likes.length}</Text>
                </View>
                <Text style={styles.title}> Nuevo comentario</Text>
                <Pressable style={styles.boton} onPress={() => this.crearComentario()}>
                    <Text style={styles.blanco}> Comentar </Text>
                </Pressable>

                <TextInput
                    style={styles.input}
                    placeholder="Escribí tu comentario..."
                    value={this.state.comentario}
                    onChangeText={text => this.setState({ comentario: text })}
                />

                <Text style={styles.title}>Home</Text>
                <Pressable style={styles.boton} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.blanco}>Volver al Home</Text>
                </Pressable>
                <Text>Comentarios: </Text>
                <FlatList
                    data={this.props.route.params.comentarios}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => <View style={styles.commentContainer}>
                        <Text style={styles.commentEmail}>{item.email}</Text>
                        <Text style={styles.commentText}>{item.comentario}</Text>
                    </View>} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: '#a1b7a1ff',
        padding: 20,
        justifyContent: "center",
        width: '100%',
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#222",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 14,
        fontSize: 16,
        marginBottom: 14,
    },
    boton: {
        backgroundColor: "#222",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 24,
    },
    botonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
    homeTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    botonSec: {
        backgroundColor: "#EAEAEA",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
    },
    botonSecText: {
        color: "#222",
        fontSize: 15,
        fontWeight: "600",
    },
    subtitle: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 7,
    },
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 8,
    },
    blanco: {
        color: "#dad0d0ff",
    },

    postContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },

    postEmail: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },

    postText: {
        fontSize: 16,
        color: "#222",
        marginBottom: 12,
    },

    postMeta: {
        fontSize: 14,
        color: "#555",
        fontStyle: "italic",
        marginBottom: 8,
    },
    commentContainer: {
        backgroundColor: "#e0f0e0", // verde clarito para diferenciar del post
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },

    commentEmail: {
        fontSize: 13,
        fontWeight: "700",
        color: "#333",
        marginBottom: 4,
    },

    commentText: {
        fontSize: 15,
        color: "#222",
    },
});

export default NuevoComentario