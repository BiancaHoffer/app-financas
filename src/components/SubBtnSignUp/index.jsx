import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'; 

import { BtnRegister, TextBtn } from './styles'; 

export function SubBtnSignUp({title, icon, ...rest}){
  return(
    <View> 
        <BtnRegister {...rest}>
          <TextBtn>{title}</TextBtn>
        </BtnRegister>
        
        <FontAwesome5 
          name={icon}
          size={16}
       />  
    </View>
  )
}


