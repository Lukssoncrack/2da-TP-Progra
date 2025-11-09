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
          console.log(auth.currentUser)
        return(
            <View>
                <Text>Posts:</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <Post postData={item.data} id={item.id.toString()} navigation={this.props.navigation} />}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
             contendor: {
    flex: 1,                   
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: '#f2f2f2' 
  },
  titulo: {
    fontSize: 32,               
    fontWeight: 'bold',
    marginBottom: 30,           
    color: '#000',              
  },
        })


export default Home;