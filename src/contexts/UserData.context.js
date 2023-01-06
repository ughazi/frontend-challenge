/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useEffect, useState } from 'react';

/**
 * @typedef UserDataContext
 * @property {string} name
 * @property {string} email
 * @property {string} password
 * @property {string} color
 * @property {boolean} terms
 * @property {function} setName
 * @property {function} setEmail
 * @property {function} setPassword
 * @property {function} setColor
 * @property {function} setTerms
 * @property {function} resetState
 */

function getInitialState() {
  const userData = localStorage.getItem('user-data');
  return userData ? JSON.parse(userData) : {};
}

/** @type {import('react').Context<UserDataContext>} */
export const UserDataContext = createContext({});

export const UserDataProvider = (props) => {
  const [name, setName] = useState(getInitialState().name ?? '');
  const [email, setEmail] = useState(getInitialState().email ?? '');
  const [password, setPassword] = useState(getInitialState().password ?? '');
  const [color, setColor] = useState(getInitialState().color ?? '');
  const [terms, setTerms] = useState(getInitialState().terms ?? false);

  const resetState = useCallback(() => {
    setName('');
    setEmail('');
    setPassword('');
    setColor('');
    setTerms(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('user-data', JSON.stringify({ name, email, password, color, terms }));
  }, [name, email, password, color, terms]);

  return (
    <UserDataContext.Provider
      value={{
        name,
        email,
        password,
        color,
        terms,
        setName,
        setEmail,
        setPassword,
        setColor,
        setTerms,
        resetState
      }}>
      {props.children}
    </UserDataContext.Provider>
  );
};
