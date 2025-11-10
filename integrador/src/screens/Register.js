
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { auth } from "../firebase/config"; 
import { db} from '../firebase/config';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      error: ""
    };
  }

  onSubmit(email, password) {
    

    if (!email.includes("@")) {
      this.setState({ error: "Email mal formateado" });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: "La password mínima de 6 caracteres" });
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Usuario registrado correctamente");
        
  db.collection('users').add({
            email: auth.currentUser.email,
            userName: this.state.userName,
            createdAt: Date.now(),
        })
        .then(response => console.log(response))
        
        .catch( e => console.log(e))

        this.props.navigation.navigate("Login"); 
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Fallo en el registro." });
      });

      
  }

  render() {
        auth.onAuthStateChanged(user=> {
            if (auth.currentUser.email == user.email){
           this.props.navigation.navigate("HomeMenu")
         }
   
        })
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <Pressable
          style={styles.buttonSecondary}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={styles.buttonSecondaryText}>Ir a Login / Ya tengo cuenta</Text>
        </Pressable>

        <TextInput
          style={styles.input}
          placeholder="userName"
          onChangeText={(text) => this.setState({ userName: text })}
          value={this.state.userName}
        />

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <Pressable style={styles.buttonPrimary} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.buttonPrimaryText}>Registrar</Text>
        </Pressable>

        {this.state.error ? (
          <Text style={styles.error}>{this.state.error}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111",
    marginBottom: 25,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#DDD",
    width: "100%",
  },
  buttonPrimary: {
    backgroundColor: "#222",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonPrimaryText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "#EEE",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonSecondaryText: {
    color: "#222",
    fontSize: 15,
    fontWeight: "600",
  },
  error: {
    marginTop: 15,
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
});

export default Register;