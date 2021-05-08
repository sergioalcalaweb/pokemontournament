import React from 'react'
import Container from '@material-ui/core/Container';
import { Box, makeStyles, Paper } from '@material-ui/core';
import Image from '../components/Image';
import Logo from '../assets/logo.png'
import FirebaseAuth from '../components/FirebaseAuth'

const useStyles = makeStyles( theme => ({
  root: {    
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%);',
    height:"100vh"
  }
}));


const Login = () => {
  const clases = useStyles();
  return (
    <Container 
      disableGutters={true} 
      maxWidth={false} 
      className={clases.root}>
      <Box 
        width="100%" 
        height="100%" 
        display="flex"
        flexDirection="row">
          <Box              
            flexGrow={1}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            >              
              <Image path={Logo} />          
          </Box>
          <Box
            flexGrow={1}
            >
            <Paper style={{ height:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center' }}>                
              <FirebaseAuth /> 
            </Paper>
          </Box>
      </Box>
    </Container>
  )
}


export default Login;