import React, { useState } from 'react';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalStyling from '../styles/GlobalStyling';
import ButtonStyled from './ButtonStyled';
import BACKEND_URL from '../environment';
import TextFieldStyled from './TextFieldStyled';
import GenericPage from './GenericPage';
import Gap from './Gap';

export default function LoginScreen({ navigation, setIsLoggedIn, setUserData }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState('');

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(BACKEND_URL + '/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Autherization': token,
        }
    });
    const json = await response.json();
    setUserData(json);
}

  const handlePress = async () => {
    if (isLogin) {
      if (email === '' || password === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    } else {
      if (email === '' || password === '' || firstName === '' || lastName === '') {
        setMessage('Please fill out all fields.');
        return;
      }
    }
  
    const url = isLogin
      ? BACKEND_URL + '/login'
      : BACKEND_URL + '/register';
  
    const body = isLogin
      ? { username: email, password }
      : { username: email, password, firstname: firstName, lastname: lastName };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
      if (response.ok) {
        if (isLogin) {
          setMessage('Login successful');
          if (result.token) {
            // Save token and update login state
            await AsyncStorage.setItem('token', result.token);
            await fetchUserData();
            setIsLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        } else {
          setMessage('Registration successful. Please log in.');
          setIsLogin(true); // Switch to login view
        }
      } else {
        setMessage(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to the server.');
    }
  };

  return (
    <GenericPage>

      {/* Header */}
      <Text style={GlobalStyling.headerAccent}>{isLogin ? "Login" : "Sign Up"}</Text>

      <Gap size={25}/>

      {!isLogin && (
        <>
          {/* Signup Fields */}
          <TextFieldStyled
            placeholder="Enter first name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <TextFieldStyled
            placeholder="Enter last name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
        </>
      )}

      {/* Login Fields */}
      <TextFieldStyled
        placeholder="Enter email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextFieldStyled
        placeholder="Enter password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />

      <Gap/>

      {/* Login/Signup buttons */}
      <ButtonStyled 
        title={isLogin ? "Login" : "Sign Up"} 
        onPress={handlePress} 
      />
      <ButtonStyled 
        title={isLogin ? "Switch to Sign Up" : "Switch to Login"} 
        onPress={() => setIsLogin(!isLogin)} 
      />

      <Gap/>

      {/* Validation Message */}
      {message ? <Text style={GlobalStyling.text}>{message}</Text> : null}

    </GenericPage>
  );
}

