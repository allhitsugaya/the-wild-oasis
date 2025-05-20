import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext  =  createContext()

import React from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState.js';

function DarkModeProvider({ children }) {
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(theme, 'isDarkMode');

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  useEffect(function (){
    if(isDarkMode){
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode')
    }
    else{
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);
  return (
    <DarkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode(){
  const context = useContext(DarkModeContext);
  if(context === undefined) throw new Error('DarkModeContext was used outside of DarkProvider');
  return context;
}
export {DarkModeProvider, useDarkMode};
