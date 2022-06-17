import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../contexts/auth';

import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import { MaterialIcons } from '@expo/vector-icons';

import { ContainerUser, TextWelcome, TextNameEmail } from './styles';

import { 
  Background,
  BtnSignOut, 
  TextSignOut } 
from './styles';

export function CustomDrawer(props){
  const { signOut, user } = useContext(AuthContext);
  
  function handleSignOut(){
    signOut();
  }

  return(
    <Background>
      <DrawerContentScrollView {...props}>
        <ContainerUser>
          <TextWelcome>Welcome!</TextWelcome>
          <TextNameEmail>{user.nome}</TextNameEmail>
          <TextNameEmail>{user.email}</TextNameEmail>
        </ContainerUser>
        
        <DrawerItemList {...props}/>

  
        <BtnSignOut onPress={handleSignOut}>
          <TextSignOut>Sign Out</TextSignOut>
          <MaterialIcons name="logout" size={24} color="#d4d1d1" />
        </BtnSignOut>

      </DrawerContentScrollView> 
    </Background>
  )
}
