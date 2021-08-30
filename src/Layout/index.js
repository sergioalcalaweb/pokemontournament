import { Box } from '@material-ui/core';
import React from 'react';
import Header from './Header';



const Layout = ({children}) => {

  return (
    <>      
      <Header />      
      <Box paddingRight='env(safe-area-inset-right)' paddingBottom='env(safe-area-inset-bottom)' paddingLeft='env(safe-area-inset-left)' minHeight='calc(100vh - 64px)'>
        {children}
      </Box>
    </>
  )
}

export default Layout
