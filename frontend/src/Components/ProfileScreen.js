// WelcomeScreen.js
import React, { useEffect } from 'react';
import { Text } from 'react-native';
import ProfileImage from './ProfileImage';
import GlobalStyling from '../styles/GlobalStyling';
import PersonalizedGreeting from './PersonalizedGreeting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Gap from './Gap';
import ButtonStyled from './ButtonStyled';
import TextFieldStyled from './TextFieldStyled';
import GenericPage from './GenericPage';
import SwitchStyled from './SwitchStyled';
import AppColors from '../styles/AppColors';

export default function ProfileScreen({ navigation, setIsLoggedIn, userData }) {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profile, setProfile] = useState({});
  const [lightMode, setLightMode] = useState(false);
  

  const handleBack = async () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    try{
      await AsyncStorage.setItem('profile', JSON.stringify({first: firstname, last: lastname}));
      await getProfile();
    } catch (error) {
      console.log(error);
    }
  }

  const handleLightMode = async (value) =>{
    setLightMode(value);

    try {
      await AsyncStorage.setItem('lightMode', JSON.stringify({enabled: value}));
    } catch (error) {
      console.log(error);
    }
  }

  const getProfile = async () => {
    try {
      let profileToken = JSON.parse(await AsyncStorage.getItem('profile'))
      if (profileToken){
        setProfile(profileToken);
      }
      else{
        setProfile({first: '', last: ''});
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getLightMode = async () => {
    try {
      let lightModeToken = JSON.parse(await AsyncStorage.getItem('lightMode'))
      if (lightModeToken){
        setLightMode(lightModeToken.enabled);
      }
      else{
        setLightMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProfile();
    getLightMode();
  }, [])

  return (
    <GenericPage>
      <PersonalizedGreeting userData={userData} greeting="Profile"/>
      <Gap/>
      <ProfileImage/>

      <Gap size={40}/>

      <Text style={GlobalStyling.headerAccent}>Name</Text>
      <Text style={GlobalStyling.text}>{((profile.first == '' && profile.last == '')) ? '*No Name Information*' : profile.first + ' ' + profile.last}</Text>

      <Gap/>

      {/* TextFields */}
      <TextFieldStyled
        placeholder='First Name'
        onChangeText={text => setFirstname(text)}
      />
      <TextFieldStyled
        placeholder='Last Name'
        onChangeText={text => setLastname(text)}
      />

      <Gap/>

      {/* Buttons */}
      <ButtonStyled 
        title='Save'
        onPress={handleSave}
      />
      <ButtonStyled
        title='Back'
        onPress={handleBack}
      />

      {/* Light Mode Selector - NOT COMPLETED. OUT OF TIME*/}
      {/* <SwitchStyled
        onValueChange={value => handleLightMode(value)}
        value={lightMode}
      /> */}

      {/* Bottom Padding */}
      <Gap size={150}/>
    </GenericPage>
  );
}

