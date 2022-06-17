import React, { useContext } from 'react';

//context
import { AuthContext } from '../contexts/auth';

//Routes
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

export function Routes() {
  const { signed } = useContext(AuthContext);
  
  return(
    <NavigationContainer>
      {signed ? <AppRoutes/> : <AuthRoutes/>}
    </NavigationContainer>
    
  )
}