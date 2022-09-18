import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object({
  email: yup.string().required('Informe seu email'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos').required('Informe sua senha'),
  name: yup.string().max(20, 'Nome muito longo!').required('Insira um nome, por favor.')
})

export default function SignUp() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');

  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  async function saveUser() {
    await AsyncStorage.setItem('user', JSON.stringify({
      'email': email,
      'password': password,
      'age': age,
      'name': name
    }))
  }

  function handleSignUp() {
    saveUser();
    navigation.navigate<never>('Profile');
  }

  return (
    <View style={styles.container}>
      <Animatable.View 
        animation='fadeInLeft' 
        delay={500} 
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Cadastre-se</Text>
      </Animatable.View>

        <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <Controller 
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(parseInt(text))
                setEmail(text)
              }}
              onBlur={onBlur}
              placeholder='Digite um email...'
              style={[
                styles.input, {
                  borderWidth: errors.email && 1,
                  borderColor: errors.email && '#ff375b'
              }]}
            />
          )}
        />
        {errors.email && <Text style={styles.labelError}>{errors.email?.message?.toString()}</Text>}

        <Text style={styles.title}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value }}) => (
            <TextInput 
              value={value}
              onChangeText={(text) => {
                onChange(parseInt(text))
                setPassword(text)
              }}
              onBlur={onBlur}
              placeholder='Sua senha'
              secureTextEntry={true}
              style={[
                styles.input, {
                  borderWidth: errors.password && 1,
                  borderColor: errors.password && '#ff375b'
              }]}
            />
          )}
        />
        {errors.password && <Text style={styles.labelError}>{errors.password?.message?.toString()}</Text>}

        <Text style={styles.title}>Idade</Text>
        <Controller 
          control={control}
          name="age"
          render={({ field: { onChange, onBlur, value }}) => (
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(parseInt(text))
                setAge(text)
              }}
              onBlur={onBlur}
              placeholder='Digite sua idade...'
              keyboardType='numeric'
              maxLength={2}
              style={styles.input}
            />
          )}
        />
        
        
        <Text style={styles.title}>Nome</Text>
        <Controller 
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              onChangeText={(text) => {
                onChange(parseInt(text))
                setName(text)
              }}
              onBlur={onBlur}
              placeholder='Como você prefere ser chamado(a)? ...'
              style={[
                styles.input, {
                  borderWidth: errors.name && 1,
                  borderColor: errors.name && '#ff375b'
              }]}
            />
          )}
        />
        {errors.name && <Text style={styles.labelError}>{errors.name?.message?.toString()}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit(handleSignUp)}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

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
    width: '100%',
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
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
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,  
  }
})