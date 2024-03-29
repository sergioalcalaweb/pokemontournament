import { AppBar, Box, ButtonBase, LinearProgress, makeStyles, Toolbar } from '@material-ui/core';
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

const Loading = () => {

  const classes = useStyles();    

  return (   
    <>    
      <AppBar className={classes.appBar} elevation={0} position="static">
        <Toolbar>
          <div className={classes.title}>
            <ButtonBase>
              <Image path={Logo} style={{ width:'60px' }} />
            </ButtonBase>
          </div>          
        </Toolbar>
      </AppBar>
      <Box minHeight='calc(100vh - 64px)'>
        <LinearProgress />            
      </Box>
    </> 
  )
}

export default Loading
