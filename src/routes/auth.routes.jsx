import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//pages auth
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp'

const { Screen, Navigator } = createNativeStackNavigator();

export function AuthRoutes() {
  return(
    <Navigator>
      <Screen
        name='SignIn'
        component={SignIn}
        options={
          {headerShown: false}
        }
      />

      <Screen
        name='SignUp'
        component={SignUp}
        options={{
          headerStyle: {
            backgroundColor: '#2C3338',
            borderBottomWidth: 1,
            borderBottomColor: '#627575'
          },
         headerTintColor: '#627575',
         headerTitle: '',
         headerBackTitleVisible: false,
         headerShown: false
        }}
      />
    </Navigator>
  );
}