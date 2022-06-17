import React from 'react';
import { LogBox } from 'react-native';

//contexts
import AuthProvider from './contexts/auth';

//Routes
import { Routes } from './routes';

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core and will be removed in a future release"]);

export function App() {
  return (
      <AuthProvider>
        <Routes/>
      </AuthProvider>
  );
}
