import React, {Component} from "react";
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { auth } from "../firebase/config";


class Profile extends Component{
    constructor(props){
        super(props)
        this.state=''
    }
logout (){
auth.signOut()
  this.props.navigation.navigate("Login")
}

render(){
    return(
        <View style={styles.contendor}>
            <Text style={styles.titulo}>Profile</Text>
                        <Pressable style={styles.boton}
                            onPress={ ()=> this.props.navigation.navigate("Login")}>
                            <Text  style={styles.text}>Log out</Text>
            
                        </Pressable>

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
  boton: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
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
export default Profile;