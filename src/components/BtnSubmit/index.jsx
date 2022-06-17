import React, {useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

//inputs para registro e login

import { BtnLogin, TextBtn } from './styles';

export function BtnSubmit({title, ...rest}){

  return(
      <BtnLogin {...rest}>
        <TextBtn>{title}</TextBtn>
      </BtnLogin>
  )
}