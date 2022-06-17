import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import { AntDesign } from '@expo/vector-icons'; 

import { 
  Container, 
  ContainerIcon, 
  TypeText, 
  BalanceText } 
from './styles';

export function Transactions({ data, deleteItem }){
  return(
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <ContainerIcon>
          <AntDesign
            name= {data.type === 'Surplus' ? 'arrowup' : 'arrowdown'}
            size={15}
            color="#3B4148"/>
          <TypeText>{data.type}</TypeText>
        </ContainerIcon>
      
        <BalanceText>US$ {data.value}</BalanceText>
      </Container>
    </TouchableWithoutFeedback>
  )
}