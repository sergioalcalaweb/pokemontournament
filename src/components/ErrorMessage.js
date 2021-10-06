import { AppBar, Box, ButtonBase, makeStyles, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import Image from './Image';
import Logo from "../assets/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
    paddingTop:'env(safe-area-inset-top)'  
  }
}));

const ErrorMessage = ({ message, errorType }) => {

  const classes = useStyles();    

  return (   
    <>    
      <AppBar className={classes.appBar} elevation={0} position="static">
        <Toolbar>
          <div className={classes.title}>
            <ButtonBase onClick={() => {
              window.location.reload();
            }}>
              <Image path={Logo} style={{ width:'60px' }} />
            </ButtonBase>
          </div>          
        </Toolbar>
      </AppBar>
      <Box minHeight='calc(100vh - 64px)' display='flex' flexDirection='column' padding={10}>
        <Typography variant='h2' align='center'>
          Ups. hubo un error disculpa las molestias intenta entrar mas tarde
        </Typography>
        <br />
        <Typography>
          {errorType}
        </Typography>
        <br />
        <Typography>
          {message}
        </Typography>
      </Box>
    </> 
  )
}

export default ErrorMessage
