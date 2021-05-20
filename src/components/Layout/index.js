import { Box } from '@material-ui/core';
import React from 'react'
import Header from '../Header';

const Layout = ({children}) => {
  return (
    <>
      <Header />      
      {/* style={{ background:'#ECEFF6' , clipPath: location.pathname.indexOf('/mistorneos/') !== - 1 ? '':'polygon(0 30px, 0 100%, 100% 100%, 100% 0, 30px 0)' }} */}
      <Box minHeight='calc(100vh - 64px)'  style={{ background:'#ECEFF6', borderRadius:'30px 30px 0 0'}}>
        {children}
      </Box>
    </>
  )
}

export default Layout
