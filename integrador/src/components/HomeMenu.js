import React, {Component} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import NuevoPosteo from "../screens/NuevoPosteo";
import NavegacionComentario from "./NavegacionComentario";
import { auth, db } from "../firebase/config";


const Tab = createBottomTabNavigator();

class HomeMenu extends Component { 
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
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="NavegacionComentario" component={ NavegacionComentario } options={{headerShown:false, tabBarIcon:()=> 
    <FontAwesome5 name="home" size={24} color="black" />}
         } />
     

        <Tab.Screen name="NuevoPosteo" component={ NuevoPosteo }
        options={ {headerShown:false, tabBarIcon: ()=>
    <AntDesign name="plus-circle" size={24} color="black" />}
        }/>

               <Tab.Screen name="Profile" component={ Profile }
          options={ {headerShown:false, tabBarIcon:()=> 
    <AntDesign name="user" size={24} color="black" />}
         } />
          
        </Tab.Navigator>


    )
}
}


export default HomeMenu;