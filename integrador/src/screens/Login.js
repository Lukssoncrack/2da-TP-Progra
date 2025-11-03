

import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { auth } from "../firebase/config";  

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
  }

  onSubmit(email, password) {


    
    if (!email.includes("@")) {
      this.setState({ error: "Email mal" });
      return;
    }

    if (password.length < 6) {
      this.setState({ error: "La password mínima de 6 caracteres" });
      return;
    }

 
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Login exitoso");//        this.setState({registered: true});
        this.props.navigation.navigate("HomeMenu"); // te hace que redirijas al home
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Credenciales incorrectas" });
      });

    
  }



  render() {
     auth.onAuthStateChanged(user=> {
         if (auth.currentUser.email == user.email){
        this.props.navigation.navigate("HomeMenu")
      }

     })
    return (
      <View style={styles.contendor}>
        <Text style={styles.titulo}>Login</Text>

        <TextInput
          style={styles.field}
          keyboardType="email-address"
          placeholder="email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.text}>Iniciar sesión</Text>
        </Pressable>

        <Pressable
          style={styles.boton}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.text}>Ir a Register</Text>
        </Pressable>

        {this.state.error ? (
          <Text style={{ color: "red", marginTop: 10 }}>{this.state.error}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contendor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 10,
    marginTop: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
  },
  field: {
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginVertical: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  boton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#28a745",
    alignItems: "center",
    width: "80%",
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;
