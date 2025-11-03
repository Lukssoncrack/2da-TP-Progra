import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";


class Post extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    
    onLike(){
       
        if(auth.currentUser){
            db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(response => {
                console.log('Like agregado')
            })
            .catch(error => {
                console.log(error)
            })
            console.log(likes);
        }
    }

    onUnlike(){
        if(auth.currentUser){
            db.collection('posts').doc(this.props.id).update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(response => {
                console.log('Like removido')
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    render(){
        return(
            <View style={styles.conteiner}>
                <Text style={styles.title}>{this.props.postData.email}</Text>
                <Text style={styles.message}>{this.props.postData.message}</Text>
                <Text style={styles.likes}>Likes: {this.props.postData.likes ? this.props.postData.likes.length : 0}</Text>
                {auth.currentUser ? ( this.props.postData.likes.includes(auth.currentUser.email) ?
                        <Pressable style={styles.boton2} onPress={()=>this.onUnlike()}>
                            <Text>Quitar like</Text>
                        </Pressable>
                        :
                        <Pressable style={styles.boton} onPress={()=>this.onLike()}>
                            <Text>Like</Text>
                        </Pressable> ) : (<Text style={styles.noAuth}>Debes estar logueado para dar like</Text>)}
                </View>
        )
    }
}
const styles = StyleSheet.create({
    title:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:5
    },
    message:{
        fontSize:16,
        marginBottom:10
    },
    likes:{
        fontSize:14,
        marginBottom:5,
        color:'gray'
    },
    boton:{
        backgroundColor:'orange',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7
    },
    boton2:{
        backgroundColor:'lightblue',
        borderRadius:4,
        padding:10,
        alignItems:'center',
        marginBottom:7
    },
    noAuth:{
        fontSize:12,
        color:'red',
        textAlign:'center',
        marginTop:5
    },
    conteiner:{
        padding:10
    }
  
  });


export default Post