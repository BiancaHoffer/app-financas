import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomDrawer } from '../components/CustomDrawer';

import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { New } from '../screens/New';

import { Octicons } from '@expo/vector-icons'; 

const { Navigator, Screen} = createDrawerNavigator();

export function AppRoutes() {
  return(
    <Navigator
      drawerContent={(props) => <CustomDrawer {...props}/> }
      screenOptions={{
        headerShown: false, 
        drawerActiveBackgroundColor: '#3B4148',
        drawerActiveTintColor: '#5AA81B',
        drawerInactiveTintColor: '#d4d1d1',
        drawerLabelStyle: {
          marginLeft: 15,
          fontSize: 15
        }
      }}
    >
      <Screen
        name='Home'
        component={Home}
      />

      <Screen
        name='Profile'
        component={Profile}
      />

      <Screen
        name='New'
        component={New}
        options={{ title: 'New Register' }}
      />
    </Navigator>
  );
}