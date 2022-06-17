import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import { Container } from './styles';

export function Header(){
  const navigation = useNavigation();
  
  function openDrawer(){
    navigation.openDrawer();
  }
  
  return(
    <SafeAreaView style={{width: '100%'}}>
      <Container>
        <TouchableOpacity onPress={openDrawer}>
          <Feather name="menu" size={30} color="#d4d1d1" />
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  )

}

