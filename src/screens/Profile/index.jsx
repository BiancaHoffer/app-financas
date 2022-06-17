import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { AuthContext } from '../../contexts/auth'

import { useNavigation } from '@react-navigation/native';

import { BtnSubmit} from '../../components/BtnSubmit'
import { Header } from '../../components/Header';

import { Container, AreaName, TextBtn } from './styles';

export function Profile() {
  const navigation = useNavigation();
  
  const { user, signOut } = useContext(AuthContext);
  
  function handleSignOut(){
    signOut();
  }

  function navigate(){
    navigation.navigate('New');
  }

  return(
    <Container>
      <Header/>

      <AreaName>{user.nome}</AreaName>
      
      <BtnSubmit 
        title={'Record expenses'} 
        onPress={navigate}
      />
        
      <BtnSubmit 
        style={{backgroundColor: '#be2222', marginTop: 15}}
        onPress={handleSignOut}
        title={'Sign out'}
      />
    
    </Container>
  );
}
