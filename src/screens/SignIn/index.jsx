import React, { useContext, useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard, 
  ActivityIndicator
} from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { useNavigation } from '@react-navigation/native';

import { InputForm } from '../../components/Input';
import { BtnSubmit } from '../../components/BtnSubmit';
import { SubBtnSignUp } from '../../components/SubBtnSignUp';

import { Background, TextBtn } from './styles';
  
export function SignIn() {
  
   const navigation = useNavigation();

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  
  const { signIn, loadingSubmit } = useContext(AuthContext);

  function handleSignIn() {
    signIn(email, password);
  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      
      <Background>

        <KeyboardAvoidingView behavior="position" enabled>
          
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

        
          <BtnSubmit title={'SignIn'} onPress={handleSignIn}>
            {loadingSubmit ? <ActivityIndicator size={20} color='#627575'/> : <BtnSubmit title={'SignIn'}/>}
          </BtnSubmit>
        
          <SubBtnSignUp 
            title={"Don't have an account? Register"} 
            onPress={() => navigation.navigate('SignUp')}
          />
        

        </KeyboardAvoidingView>

      </Background>

    </TouchableWithoutFeedback>
  );
}
