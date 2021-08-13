import { Box } from '@material-ui/core';
import React from 'react'
import Header from '../Header';

const Layout = ({children}) => {

  return (
    <>
      <Header />      
      <Box minHeight='calc(100vh - 64px)'>
        {children}
      </Box>
    </>
  )
}

export default Layout
