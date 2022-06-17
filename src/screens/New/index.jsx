import React, { useState, useContext } from 'react';
import {Keyboard, TouchableWithoutFeedback, Alert} from 'react-native';

import firebase from '../../firebase/firebaseConnection';

//import { format } from 'date-fns'

import { AuthContext } from '../../contexts/auth';

import { Container, ContainerInputs, Input, BtnText } from './styles';

import { Header } from '../../components/Header';
import { BtnSubmit } from '../../components/BtnSubmit';

import { PickerNew } from './PickerNew/index';


export function New() {
  const [value, setValue] = useState('');
  const [type, setType] = useState('Surplus');
  
  const { user: userContext} = useContext(AuthContext);

  async function handleAddType(){
    let valueNumeric = parseFloat(value);
    
    //verifica se value é número e campo vazio
    if(isNaN(valueNumeric) || value === '') {
      alert('Preencha todos os campos.')
      return;
    }

    //Firebase
    //pegando id do usuário logado
    let uid = userContext.uid; 

    //cria chave aleatória e adiciona em historical => uid => key
    let key = await firebase.database().ref('historical').child(uid).push().key;
    await firebase.database().ref('historical').child(uid).child(key).set({
      type: type,
      value: valueNumeric,
      //date: format(new Date(), 'dd/MM/yyyy')
    })

    //atulizar saldo
    // pegando número do usuário, que contém o saldo atual. 
    let user = firebase.database().ref('users').child(uid)
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);
      
      //-=: subtrai com saldo que já tem           //+=: soma com o saldo que já tem
      type === 'Surplus' ? saldo += valueNumeric : saldo -= valueNumeric
      
      //indo no saldo e atualizar ele
      user.child('saldo').set(saldo);
    })

    //Tratamentos
    Keyboard.dismiss();
    setValue('');
  }
    
  return(
    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      
      <Container>
        
        <Header/>

        <ContainerInputs>
          <Input
            placeholder='US$ 00.00'
            placeholderTextColor='#627575'
            keyboardType='numeric'
            returnKeyType='next'
            value={value}
            onChangeText={(text) => setValue(text)}
          />

          <PickerNew onChange={setType} type={type}/>
      
          <BtnSubmit 
            title={'Add'} 
            onPress={handleAddType} 
            style={{marginLeft: -0}}
          />
      
        </ContainerInputs>
      
      </Container>

    </TouchableWithoutFeedback>
  )
}