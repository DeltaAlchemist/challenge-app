import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Informe seu email'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos').required('Informe sua senha')
})

const userInfo = { email: 'a@gmail.com', password: '123456'}
export default function SignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })

  function handleSignIn() {
    navigation.navigate<never>('Profile')
  }

  async function login() {
    if (userInfo.email === email && userInfo.password === password) {
      await AsyncStorage.setItem('isLoggedIn', '1');
    } else {
      alert('Dados de login incorretos.')
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View 
        animation='fadeInLeft' 
        delay={500} 
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-Vindo(a)</Text>
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

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit(handleSignIn)}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
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
    paddingVertical: 6,
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