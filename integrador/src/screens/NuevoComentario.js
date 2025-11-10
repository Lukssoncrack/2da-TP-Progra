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
        <Text style={styles.title}>Nuevo comentario</Text>

        <TextInput
          style={styles.input}
          placeholder="Escribí tu comentario..."
          value={this.state.comentario}
          onChangeText={text => this.setState({ comentario: text })}
        />

        <Pressable style={styles.boton} onPress={() => this.crearComentario()}>
          <Text style={styles.botonText}>Comentar</Text>
        </Pressable>

        
        <Pressable style={styles.botonSec} onPress={() => this.props.navigation.navigate('HomeMenu')}>
          <Text style={styles.botonSecText}>Volver al Home</Text>
        </Pressable>
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
});

export default NuevoComentario