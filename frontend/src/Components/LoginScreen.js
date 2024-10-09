import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation, setIsLoggedIn }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  //setIsLogin(false);

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
      ? 'http://10.200.116.183:5000/login'
      : 'http://10.200.116.183:5000/register';
  
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
  


  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>

      {!isLogin &&
      <View>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={text => setLastName(text)}
        />
      </View>
      }
      <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
        />
      <View style={styles.button}>
        <Button title={isLogin ? "Login" : "Sign up"} onPress={handlePress} />
      </View>
      <View style={styles.button}>
        <Button title={isLogin ? "SWITCH TO SIGN UP" : "SWITCH TO LOGIN"} onPress={handleSwitch}/>
      </View>
      {message && <Text style={styles.validationText}>{message}</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    width: '80%',
    margin: 'auto',
    marginBottom: 12,
    marginTop: 12,
    paddingLeft: 8,
  },
  button: {
    width: '50%',
    margin: 'auto',
    marginTop: 12,
    marginBottom: 12,
  },
  validationText: {
    textAlign: 'center',
    fontSize: 18
  }
});
