import { createMuiTheme, CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { red } from '@material-ui/core/colors';
import React, { createContext, useEffect, useMemo, useState } from 'react'
import ReactGA from 'react-ga4';

export const AppContext = createContext();

const AppProvider = ({children}) => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [dark, setDark] = useState(false);
  const [welcome, setWelcome] = useState(true);

  useEffect(() => {
    ReactGA.initialize(process.env.REACT_APP_GA);
    // ReactGA.send("pageview"); 
    console.log(ReactGA.isInitialized);        
  }, [])

  useEffect(() => {


    if(prefersDarkMode) {
      setDark(prefersDarkMode);
    }
  }, [prefersDarkMode])

  const theme = useMemo(
    () =>      
    createMuiTheme({      
      palette: {
        type: dark ? 'dark' : 'light',
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
    console.log(ReactGA._current_GA_MEASUREMENT_ID);
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
