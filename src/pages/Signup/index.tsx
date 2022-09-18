import React from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { BaseDto }  from '../../models/BaseDto';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const emailState: BaseDto = {
    value: ''
}

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Informe seu email'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos').required('Informe sua senha')
})

export default function SignUp() {
  const navigation = useNavigation();

  const { control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  })
  
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
              onChangeText={onChange}
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
              onChangeText={onChange}
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
        <TextInput 
          placeholder='Digite sua idade...'
          keyboardType='numeric'
          maxLength={2}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate<never>('Profile')}>
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
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',
    marginBottom: 8,  
  }
})