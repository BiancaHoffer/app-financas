import React, { useContext, useState, useEffect, useRef} from 'react';
import { Alert } from 'react-native';

import firebase from '../../firebase/firebaseConnection';

//import { format, isPast, isBefore } from 'date-fns'

import { AuthContext } from '../../contexts/auth';

import { Header } from '../../components/Header';
import { Transactions } from '../../components/Transactions';

import { 
  Background, 
  ContainerNameSaldo, 
  TextName, 
  TextSaldo, 
  Title, 
  List } 
from './styles';

export function Home() {
  const [historical, setHistorical] = useState([]);
  const [saldo, setSaldo] = useState(0);
  
  const { user } = useContext(AuthContext)

  //pegando id do usuário logado
  const uid = user && user.uid;

  useEffect(()=>{
    //para puxarmos do banco de dados o saldo atual. 
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) =>{
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historical')
      .child(uid)
      //registro por dia
      //.orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy'))
      .limitToLast(100).on('value', (snapshot)=>{
        setHistorical([]);

        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
            //date: chilItem.val().date
          };

          setHistorical(oldArray => [...oldArray, list].reverse());
        })
      })
    }

    loadList();
  }, [])

  function handleDelete(data){
    /*
    Alterando para data modo americano com time zerado
    const [day, month, year] = data.date.split('/');
    const dateItem = new Date(`${year}/${month}/${day}`)

    //Pegando dia atual com time zerado
    const currentDay = format(new Date(), 'dd/MM/yyy);
    const [dayToday, monthToday, yearToday] = currentDay.split('/');
    const dateToday = new Date(`${yearToday}/${monthToday}/${dayToday}`)

    if(isBefore(dateItem, dateToday)){
     Se a data registro já passou, vai entrar aqui
     alert('You cannot delete an old record.')
    }
    */

    Alert.alert(
      'Warning', 
      `Do you want to delete ${data.type} - US$${data.value}?`, 
      [{
        text: 'Cancelar', 
        style: 'cancel'
      },
      {
        text: 'Delete',
        onPress: () => handleDeleteSucess(data)
      }
    ])
  }

  async function handleDeleteSucess(data){
    await firebase.database().ref('historical').child(uid).child(data.key).remove()
    
    .then(async ()=>{
      let saldoCurrent = saldo;
      //devolve valor ao exluir                                         //retira valor ao exluir
      data.type === 'Deficit' ? saldoCurrent += parseFloat(data.value) : saldoCurrent -= parseFloat(data.value);

      //alterar na firebase
      await firebase.database().ref('users').child(uid).child('saldo').set(saldoCurrent);
      
    })
    .catch((error) => console.log(error))
  }
  
  return (
    <Background>
      <Header/>
    
      <ContainerNameSaldo>
        <TextName /*macete usado para evitar que gere erros*/>{user && user.nome}</TextName>
        <TextSaldo>US$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</TextSaldo>
      </ContainerNameSaldo>
      
      <Title>Transactions</Title>
      
      <List
        showsVerticalScrollIndicator={false}
        data={historical}
        keyExtractor={item => item.key}
        renderItem={ ({item}) => (<Transactions data={item} deleteItem={handleDelete}/>) }
        
      />
    </Background>
  );
}