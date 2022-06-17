import styled from "styled-components/native";

//IOS
export const Container = styled.View`
  justify-content: center;
  padding: 15px; 
  border-radius: 5px;
  height: 60px;
  background-color: #3B4148;
  margin: 20px 0px;
`;


export const BtnOpenModal = styled.TouchableOpacity`
  //sem estilização.
`;

export const TextType = styled.Text`
    font-size: 17px;
    color: #627575;
`;

export const ContainerModal = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;


export const ContainerTypes= styled.View`
  background-color: #d4d1d1;
  width: 100%;
  height: 220px;
`;


export const ContainerBtnType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #3B4148;
  margin-bottom: -20px;
  padding: 5px 20px;
`;


export const BtnType = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 40px;
`;



