/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useState } from 'react';

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

/** @type {import('react').Context<UserDataContext>} */
export const UserDataContext = createContext({});

export const UserDataProvider = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [color, setColor] = useState('');
  const [terms, setTerms] = useState(false);

  const resetState = useCallback(() => {
    setName('');
    setEmail('');
    setPassword('');
    setColor('');
    setTerms(false);
  }, []);

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
