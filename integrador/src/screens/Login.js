

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
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.input}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>

        <Pressable
          style={styles.buttonSecondary}
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.buttonSecondaryText}>Ir a Register</Text>
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
    fontSize: 32,
    fontWeight: "700",
    color: "#111",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontSize: 16,
    borderColor: "#DDD",
    borderWidth: 1,
    width: "100%",
  },
  button: {
    backgroundColor: "#222",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonSecondary: {
    backgroundColor: "#EEE",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonSecondaryText: {
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    marginTop: 15,
    color: "red",
    fontSize: 15,
    textAlign: "center",
  },
});

export default Login;