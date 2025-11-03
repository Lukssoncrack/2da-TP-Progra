import React, { Component } from 'react'; 
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';

class DynamicForm extends Component{
    constructor(props){
            super(props);
            this.state={comentario: ""}
    }

    onSubmit() {
    console.log("Comentario:", this.state.comentario);

  }


render(){
    return(
         <View style={styles.contendor}>
                    <Text style={styles.titulo}>Register</Text>
                 
                    <TextInput style={styles.field}
                    keyboardType= 'default' 
                    placeholder= 'comentario'
                    onChangeText={ text => this.setState({comentario:text}) }
                    value={this.state.comentario} />
        
                
                 <Pressable onPress={() => this.onSubmit()}>
                 <Text> Enviar </Text>
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
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 10,   
    marginTop: 20,          
  },

  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },

  field: {
    height: 20,                
    paddingVertical: 15,       
    paddingHorizontal: 10,     
    borderWidth: 1,            
    borderColor: '#ccc',       
    borderStyle: 'solid',      
    borderRadius: 6,           
    marginVertical: 10,        
    width: '80%',             
    backgroundColor: '#fff',   
  },

  boton: {
    backgroundColor: '#28a745', 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#28a745',
    alignItems: 'center',
    width: '80%',               
    marginVertical: 10,
  },

  text: {
    color: '#fff',              
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



export default DynamicForm;