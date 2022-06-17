import React, {} from 'react';
import {} from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { Container } from './styles';

export function PickerNew({onChange, type}){
  //const pickerRef = useRef();
  
  return(
    <Container>
       <Picker
        style={{width: '100%'}}
        selectedValue={type}
        onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
       >
         <Picker.Item
          label='Surplus' 
          value='Surplus'
         />
         <Picker.Item
          label='Deficit' 
          value='Deficit'
         />
         
       </Picker>
    </Container>
  )
}