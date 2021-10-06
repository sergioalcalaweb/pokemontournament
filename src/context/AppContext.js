import { CssBaseline, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import React, { createContext, useEffect, useMemo, useState } from 'react'
import ReactGA from 'react-ga4';

export const AppContext = createContext();

const AppProvider = ({children}) => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [dark, setDark] = useState(false);
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA);       
  }, [])

  useEffect(() => {
    if(prefersDarkMode) {
      setDark(prefersDarkMode);
    }
  }, [prefersDarkMode])

  const theme = useMemo(
    () =>      
    createTheme({      
      palette: {
        mode: dark ? 'dark' : 'light',
        primary: {
          main: '#309eb9',      
        },
        secondary: {
          main: '#E8BF4D',
        },
        error: {
          main: red.A400,
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
      },  
      typography: {    
        subtitle1: {
          fontSize: 30,
          fontWeight: 300
        },
        subtitle2: {
          fontSize: 24,
          fontWeight: 300
        },
        body1: {
          fontWeight: 300
        }
      },
    }),
    [dark]
  );

  const toggle = () => {
    setDark(!dark);
  }

  const toggleWelcome = () => {
    setWelcome(!welcome);
  }

  const setTrackEvent = () => {
    console.log(ReactGA._current_GA_MEASUREMENT_ID);
  }

  return (
    <AppContext.Provider value={{ toggle, dark, toggleWelcome, welcome, setTrackEvent }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  )
}

export {AppProvider}
