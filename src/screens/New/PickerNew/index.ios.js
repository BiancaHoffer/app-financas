import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Picker } from '@react-native-picker/picker';

import { AntDesign } from '@expo/vector-icons';

import { 
  Container, 
  BtnOpenModal, 
  TextType, 
  ContainerModal, 
  ContainerTypes, 
  ContainerBtnType, 
  BtnType 
} from './styles';

export function PickerNew({onChange, type}){
  const [modalVisible, setModalVisible] = useState(false);
  const [chooseData, setChooseData] = useState('Selected Item');

 async function closeAndSelectedItem(){
    if(type === 'Surplus') {
      setChooseData('Surplus');
    } else{
      setChooseData('Deficit');
  }
    setModalVisible(false);
  }
  
  async function close(){
    setModalVisible(false);
  }

  return(
    <Container>
      <BtnOpenModal onPress={() => setModalVisible(true)}>
        <TextType>{chooseData}</TextType>
      </BtnOpenModal>
        
      <Modal 
        transparent={true} 
        animationType='fade' 
        visible={modalVisible} 
      >
        
        <ContainerModal>
          <ContainerTypes>
            
            <ContainerBtnType>
            
              <BtnType onPress={close}>
                <AntDesign 
                  name="close" 
                  size={25} 
                  color="#d4d1d1" />
              </BtnType>

              <BtnType onPress={closeAndSelectedItem}>
                <AntDesign 
                  name="check" 
                  size={25} 
                  color="#d4d1d1" />
              </BtnType>
            </ContainerBtnType> 
          
            <Picker
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

          </ContainerTypes>
        </ContainerModal>

      </Modal>
      
    </Container>
  )
}