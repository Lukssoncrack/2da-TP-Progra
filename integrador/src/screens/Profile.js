import React, {Component} from "react";
import { View, Text, FlatList,Pressable, StyleSheet} from 'react-native';
import { auth, db } from "../firebase/config";
import Post from  '../components/Post'


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
  
  console.log(this.state.userPosts);
  


    return(
        <View style={styles.contendor}>

            <Text style={styles.titulo}>Profile</Text>
             <Text style={styles.description}>Email: {this.state.email}</Text>
          <Text style={styles.description}>Usuario: {this.state.userName}</Text>
          <Text style={styles.description}>Número de Posts: {this.state.userPosts.length}</Text>
        <Pressable style={styles.buttonBlue} onPress={this.handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>

                {this.state.userPosts.length === 0 ? (
          <Text style={styles.noPostsText}>No hay posts</Text>
        ) : (
        <FlatList
          data={this.state.userPosts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.postContainer}>
            
              <Post postData={item.data} id={item.id.toString()} navigation={this.props.navigation} />
           
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
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#a1b7a1ff',
  },

  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
    alignSelf: "center",
  },

  description: {
    fontSize: 16,
    color: "#000000ff",
    marginBottom: 6,
    fontWeight: "bold"
  
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 25,
    marginBottom: 10,
  },

  buttonBlue: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "600",
  },

  noPostsText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
    alignSelf: "center",
  },

  postContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  
  },

  postText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    fontWeight: "500",
  },
});
