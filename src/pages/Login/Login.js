import React from 'react'
import Container from '@mui/material/Container';
import { Box, Paper } from '@mui/material';
import Image from '../../components/Image';
import Logo from '../../assets/logo.png';
import FirebaseAuth from './FirebaseAuth';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles( theme => ({
  root: {    
    height:"100vh",
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
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
        flexDirection={{ xs:"column", md:"row" }} >
          <Box              
            flexGrow={1}
            height={{ xs:"50%", md:"100%" }}
            display="flex"
            mt={5}
            flexDirection="column"
            justifyContent={{ xs:"flex-start", md:"center" }}
            alignItems="center"
            >              
              <Image path={Logo} />          
          </Box>
          <Box
            flexGrow={1}
            component={Paper}
            elevation={5}
            height={{ xs:"40%", md:"100%" }}
            display='flex'
            flexDirection='column'            
            alignItems='center'
            justifyContent='center'
            position='relative'
            top={{ xs:"-20%", md: 0 }}
            width={{ xs:"80%", md:"auto" }}
            margin={{ xs:"0 auto" }}
            >
              <FirebaseAuth />         
          </Box>
      </Box>
    </Container>
  )
}


export default Login;