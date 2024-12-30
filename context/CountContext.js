import React, { createContext, useState } from 'react';

export const CountContext = createContext();

export const CountProvider = ({ children }) => {

  const [userName, setUserName] = useState('Guest');

  return (
    <CountContext.Provider value={{ userName, setUserName }}>
      {children}
    </CountContext.Provider>
  );
};
