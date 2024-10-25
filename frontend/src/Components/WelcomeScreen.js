// WelcomeScreen.js
import React from 'react';
import PersonalizedGreeting from './PersonalizedGreeting';
import ProfileImage from './ProfileImage';
import Nav from './Nav';
import GenericPage from './GenericPage';
import Gap from './Gap';

export default function WelcomeScreen({ navigation, setIsLoggedIn, userData }) {

  return (
    <GenericPage>
      <PersonalizedGreeting userData={userData} greeting='Welcome'/>
      <Gap/>
      <ProfileImage/>
      <Gap size={40}/>
      <Nav navigation={navigation} setIsLoggedIn={setIsLoggedIn}/>
    </GenericPage>
  );
}