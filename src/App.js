import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routing } from './components';
import { UserDataProvider } from './contexts/UserData.context';

import './App.css';

/**
 * @description App Component
 * Sets up the app with required Providers
 * @returns {JSX.Element}
 */
const App = () => {
  return (
    <BrowserRouter>
      <UserDataProvider>
        <Routing />
      </UserDataProvider>
    </BrowserRouter>
  );
};

export default App;
