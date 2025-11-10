import React, {Component} from "react";
import { View, Text, FlatList,Pressable, StyleSheet} from 'react-native';
import { auth, db } from "../firebase/config";


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
          email: auth.currentUser.email,
          userName: "",
          userPosts: [],
        }
    }

 componentDidMount() {
    db.collection('users')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot(docs => {
        docs.forEach(doc => {
          this.setState({ userName: doc.data().userName });
        });
      });


    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
      .onSnapshot(docs => {
        let postArray = [];
        docs.forEach(doc => {
          postArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
          this.setState({ userPosts: postArray });
      });
}

  handleLogout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };




logout (){
auth.signOut()
  this.props.navigation.navigate("Login")
}

render(){
  
  const userPosts = this.state;

    return(
        <View style={styles.contendor}>

            <Text style={styles.titulo}>Profile</Text>
             <Text style={styles.description}>Email: {this.state.email}</Text>
          <Text style={styles.description}>Usuario: {this.state.userName}</Text>
          <Text style={styles.description}>Número de Posts: {userPosts.length}</Text>
        <Pressable style={styles.buttonBlue} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>

                {userPosts.length === 0 ? (
          <Text style={styles.noPostsText}>No hay posts</Text>
        ) : (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
            
              <Text style={styles.postText}>{item.data.descrip}</Text>
              <Pressable
                style={styles.deleteButton}
                onPress={() => this.handleDeletePost(item.id)}
              >
                <Text style={styles.deleteText}>Eliminar</Text>
              </Pressable>
            </View>
         )}
         />
)}
        </View>
    )
}
}

export default Profile;

const styles = StyleSheet.create({
             contendor: {
    flex: 1,                   
    justifyContent: 'center',  
    alignItems: 'center',      
    backgroundColor: "#F5F5DC"
  },
  boton: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
    buttonBlue: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  text: {
    fontWeight: 'bold',
  },titulo: {
    fontSize: 32,               
    fontWeight: 'bold',
    marginBottom: 30,           
    color: '#000',              
  },
        })
