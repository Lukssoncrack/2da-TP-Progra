import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { db } from "../firebase/config";
import Post from "../components/Post";
import { auth } from "../firebase/config";




class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }

     componentDidMount(){
        db.collection('posts')
        .orderBy('createdAt','desc')
        .onSnapshot(
            docs => {
                const postsList = []
                docs.forEach(doc => {
                    postsList.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                this.setState({
                    posts: postsList,
                })
                console.log(postsList);
            }
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Posts</Text>

                {this.state.posts.length === 0 ? (
                    <Text style={styles.noPosts}>No hay posteos disponibles</Text>
                ) : (
                    <FlatList
                        data={this.state.posts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => 
                            <Post 
                                postData={item.data} 
                                id={item.id.toString()} 
                                navigation={this.props.navigation}
                            />
                        }
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#a1b7a1ff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222",
    marginBottom: 15,
    alignSelf: "center",

  },
  noPosts: {
    color: "#777",
    fontSize: 16,
    marginTop: 20,
    alignSelf: "center",
  },
});

export default Home;