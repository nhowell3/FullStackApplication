import React from "react";
import { View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyling from "../styles/GlobalStyling";
import ButtonStyled from "./ButtonStyled";

export default function Nav({ navigation, setIsLoggedIn }){
    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
    };

    const handleProfile = () => {
        navigation.navigate('Profile');
    }

    return(
        <>
            <ButtonStyled
                title='View Profile'
                onPress={handleProfile}
            />
            <ButtonStyled
                title='Logout'
                onPress={handleLogout}
            />
        </>
    );
}