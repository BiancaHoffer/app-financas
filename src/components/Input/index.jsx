import React, {useState} from 'react';
import {} from 'react-native';

//inputs para registro e login

import { FontAwesome } from '@expo/vector-icons'; 

import { 
  ContainerIconInput, 
  ContainerIcon, 
  Input }
from './styles';

export function InputForm({icon, value, ...rest}){
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value)
  }

  return(
    <ContainerIconInput> 
      <ContainerIcon isFocused={isFocused}>
        <FontAwesome 
          name={icon}
          size={20}
          color={(isFocused ||  isFilled) ? '#5AA81B' : '#606468'}
       />
      </ContainerIcon>
          
      <Input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={value}
        placeholderTextColor= '#627575'
        {...rest}
      />
      
    </ContainerIconInput>
  )
}