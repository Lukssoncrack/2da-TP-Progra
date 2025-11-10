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
            <View style = {styles.flatlist}>
                <Text style={styles.posteo}>Posts:</Text>
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

    flatlist: {
width: '100%',
flex: 1,
backgroundColor: "#F5F5DC"

},
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
  posteo: {
fontSize: 15,
fontWeight: "bold",
backgroundColor: '#8FBC8F',
borderRadius: 15,
padding:5,
marginLeft: 10,
marginRight: 10,
marginTop: 5


  }
        })


export default Home;