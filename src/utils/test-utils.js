import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserDataContext } from '../contexts/UserData.context';

const customRender = (ui, { providerProps, route = '/', ...renderOptions }) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <UserDataContext.Provider value={{ ...providerProps }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </UserDataContext.Provider>,
    renderOptions
  );
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { customRender };
