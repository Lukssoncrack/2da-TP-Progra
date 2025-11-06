import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import NuevoPosteo from "../screens/NuevoPosteo";


const Tab = createBottomTabNavigator();

function HomeMenu() {
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen name="Home" component={ Home } options={{headerShown:false, tabBarIcon:()=> 
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



export default HomeMenu;