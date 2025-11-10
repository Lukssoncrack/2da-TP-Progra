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
    return(
        <View style={styles.conteiner}>
            <Text style={styles.title}>Nuevo Post</Text>
            <Pressable style={styles.boton} onPress={()=>this.props.navigation.navigate('Home')}> 
                <Text>Volver al Home</Text>
            </Pressable>
            <Text style={styles.subtitle}>Mensaje</Text>
            <TextInput style={styles.input} keyboardType="default" onChangeText={text=>this.setState({message:text})} value={this.state.message}/>
            <Text style={styles.error}>{this.state.error}</Text>
            <Pressable style={styles.boton2} onPress={()=>this.onSubmit()}> 
                <Text>Crear Post</Text>
            </Pressable>
             
        </View>
    )
}
}


const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5,
        marginTop: 7,
    },
    boton:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7,
        marginTop: 7,
    },
    boton2:{
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginTop: 9,
    },
    conteiner:{
        padding:10,
        backgroundColor: "#F5F5DC",
        height: "100%"
    },
    input:{
        borderColor: 'grey',
        borderRadius: 3,
        borderWidth: 2,
        padding: 10,
    },
    subtitle:{
        fontSize:15,
        fontWeight:'semibold',
        marginBottom:5,
        marginTop:7,
    },
    error:{
        color:'red'
    }
  
  });

export default NuevoPosteo