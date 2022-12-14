import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { BaseDto }  from '../../models/BaseDto';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const navigation = useNavigation();

  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUser() {
      const userStorage = await AsyncStorage.getItem('user');
      if (userStorage) {
        setUser(JSON.parse(userStorage));
      }
    }
    loadUser();
    
  }, []);
  
  return (
    console.log(user),
    <View style={styles.container}>
      <Animatable.View 
        animation='fadeInLeft' 
        delay={500} 
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Perfil</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' style={styles.containerForm}>

        <Text style={styles.title}>Seu Nome</Text>
        <Text style={styles.info}>{user.name}</Text>

        <Text style={styles.title}>Seu email</Text>
        <Text style={styles.info}>{user.email}</Text>

        <Text style={styles.title}>Idade</Text>
        <Text style={styles.info}>{user.age}</Text>

      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBBAB9',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  containerForm: {
    backgroundColor: '#fffcf8',
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  title: {
    fontSize: 20,
    marginTop: 28
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  button: {
    backgroundColor: '#EBBAB9',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center'
  },
  registerText: {
    color: '#a1a1a1'
  },
  info: {
    marginTop: 10,
    fontSize: 16,
    color: '#a1a1a1'
  }

})