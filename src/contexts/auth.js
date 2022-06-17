import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase/firebaseConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  //leitura de dados asyncStorage
  useEffect(()=> {
    async function loadStorage(){
      const storageUser = await AsyncStorage.getItem('Auth_user');
      
      // convertendo para objeto novamente
      const jsonValue = JSON.parse(storageUser)
      
      //se tiver alguma coisa dentro da variavel, ou seja, se alguém estiver logado 
      if(storageUser !== null){
        setUser(jsonValue);
        setLoading(false);
      }
          
    }

    loadStorage();
  },[]);

  //cadastrar usuário
  async function signUp(email, password, nome){
    setLoadingSubmit(true);
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (value) => {
      let uid = value.user.uid; //criamos para que, quando criarmos o usuário, possamos acessar o id.
      //ref cria o 'users' no banco de dados, child uid que contém  a chave, e dentro da chave, vai receber saldo e nome. 
      
      //criar set
      await firebase.database().ref('users').child(uid).set({
        saldo: 0,
        nome: nome
      })
      .then(() =>{
        let data = {
          uid: uid,
          nome: nome,
          email: value.user.email.trim()
        }

        setUser(data) //quando der certo e o usuáro se cadastrar: torna o user true, null vai deixar de ser false. 
        storangeUser(data);
        setLoadingSubmit(false);
      })
    })
    .catch((error)=>{
      alert(error.code);
      setLoadingSubmit(false);
    })
  }

  //função para logar usuário
  async function signIn(email, password){
    setLoadingSubmit(true);
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(async (value)=>{
      let uid = value.user.uid
      //acessar once
      await firebase.database().ref('users').child(uid).once('value')
      .then((snapshot) => {
        let data = {
          uid: uid,
          nome: snapshot.val().nome,
          email: value.user.email
        };

        setUser(data);
        storangeUser(data);
        setLoadingSubmit(false);
      })
    })
    .catch((error)=>{
      alert(error.code);
      setLoadingSubmit(false);
    })
  }

  //adicionando novo dado asyncStorage
  async function storangeUser(data){
    //convertenso objeto para string
    const jsonValue = JSON.stringify(data)
    await AsyncStorage.setItem('Auth_user', jsonValue);
  } 

  async function signOut(){
    await firebase.auth().signOut();
    await AsyncStorage.clear()
    .then(()=>{
      setUser(null)
    })
    
  }

  
  return(
    <AuthContext.Provider value={{ signed: !!user , user, loadingSubmit, signUp, signIn, signOut}}>
      { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider;