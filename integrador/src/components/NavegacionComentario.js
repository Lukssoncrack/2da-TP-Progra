import React, {Component} from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/Home";
import { auth, db } from "../firebase/config";
import NuevoComentario from "../screens/NuevoComentario";




const Stack = createNativeStackNavigator();

class NavegacionComentario extends Component { 
         constructor(props) {
        super(props);

    }
    
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (!user) {
                this.props.navigation.navigate('Login')
            }
        })
    }

    render() {
    return(


     <Stack.Navigator>


        <Stack.Screen name="Home" component={ Home }  options={{headerShown: false}}/>
        
        <Stack.Screen name="NuevoComentario" component={ NuevoComentario } />


     </Stack.Navigator>


        
    )
}
}


export default NavegacionComentario;