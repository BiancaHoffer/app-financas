import React, { useState, useContext } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard,  
  ActivityIndicator 
} from 'react-native';

import {AuthContext} from '../../contexts/auth';

import { useNavigation } from '@react-navigation/native';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { BtnSubmit } from '../../components/BtnSubmit';

import { InputForm } from '../../components/Input'; 

import { Background, TextBtn } from './styles';
  
export function SignUp() {
  
  const navigation = useNavigation();

  const[nome, setNome] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const { signUp, loadingSubmit } = useContext(AuthContext);

  function handleSignUp(){
    signUp(email, password, nome);
  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
      <Background>
      
        <KeyboardAvoidingView behavior="position" enabled>

          <InputForm
            icon='user'
            placeholder='Name'
            autoCorrect={false} //para corretor não arrumar
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <InputForm
            icon='envelope'
            placeholder='E-mail'
            autoCorrect={false} //para corretor não arrumar
            autoCapitalize='none' //para não começar com a primeira letra maicuscula
            keyboardType='email-address' //para chamar @ no teclado
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <InputForm
            icon='lock'
            placeholder='Password'
            autoCorrect={false} 
            secureTextEntry 
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <BtnSubmit title={'SignUp'} onPress={handleSignUp}>
            {loadingSubmit ? <ActivityIndicator size={20} color='#627575'/> : <BtnSubmit title={'SignUp'}/>}
          </BtnSubmit>

        </KeyboardAvoidingView>

     </Background>

    </TouchableWithoutFeedback>
  );
}