import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Pressable, FlatList } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { db, auth } from '../firebase/config'
import firebase from "firebase";


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }

    onLike() {

        if (auth.currentUser) {
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

    onUnlike() {
        if (auth.currentUser) {
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

    render() {
        return (
            <View style={styles.postContainer}>
                
                <Text style={styles.email}>{this.props.postData.email}</Text>
                <Text style={styles.message}>{this.props.postData.message}</Text>
                <Text style={styles.likes}>Likes: {this.props.postData.likes ? this.props.postData.likes.length : 0}</Text>

                {auth.currentUser ? (
                    this.props.postData.likes.includes(auth.currentUser.email) ? (
                        <Pressable style={styles.unlikeButton} onPress={() => this.onUnlike()}>
                            <Text style={styles.unlikeText}>Quitar like</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={styles.likeButton} onPress={() => this.onLike()}>
                            <Text style={styles.likeText}>Like</Text>
                        </Pressable>
                    )
                ) : (
                    <Text style={styles.noAuth}>Debes estar logueado para dar like</Text>
                )}

                <Pressable 
                    style={styles.commentButton} 
                    onPress={() => this.props.navigation.navigate('NuevoComentario')}
                >
                    <Text style={styles.commentText}>Comentar</Text>
                </Pressable>

            </View>
        )
    }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 14,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  email: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },
  message: {
    fontSize: 16,
    color: "#222",
    marginBottom: 10,
  },
  likes: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  likeButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  likeText: {
    color: "#FFF",
    fontWeight: "600",
  },
  unlikeButton: {
    backgroundColor: "#555",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  unlikeText: {
    color: "#FFF",
    fontWeight: "600",
  },
  noAuth: {
    fontSize: 12,
    color: "red",
    textAlign: "center",
    marginBottom: 8,
  },
  commentButton: {
    backgroundColor: "#EEE",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  commentText: {
    color: "#222",
    fontWeight: "600",
  },
});

export default Post;