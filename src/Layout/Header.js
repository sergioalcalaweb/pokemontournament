import { AppBar, Avatar,  ButtonBase, IconButton, makeStyles, Menu, MenuItem, Toolbar } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from 'reactfire';
import Image from '../components/Image'
import Logo from "../assets/logo.png";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

import Install from './Install';
import { AppContext } from '../context/AppContext';
import Notifications from './Notifications';
import useTrainee from '../hooks/useTrainee';

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
    
  },
}));

const Header = () => {
  const { dark, toggle } = useContext(AppContext);
  const classes = useStyles();
  const { info: user, tournaments} = useTrainee();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  let history = useHistory();
  const { pathname } = useLocation();  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    handleClose();
    await auth.signOut();    
  };

  const goProfile = () => {
    handleClose();
    history.push('/perfil');
  };

  const goHome = () => {    
    history.push('/home');
  };

  const goBack = () => {    
    history.goBack();
  };

  return (
    <AppBar className={classes.appBar} elevation={0} position='sticky'>
      <Toolbar>
        { pathname !== '/home' && (
          <IconButton onClick={goBack} edge="start" color="inherit" aria-label="menu">
            <ArrowBackIcon />
          </IconButton>
        ) }
        <div className={classes.title}>
          <ButtonBase onClick={goHome}>
            <Image path={Logo} style={{ width:'60px' }} />
          </ButtonBase>
        </div>
        <IconButton onClick={toggle} aria-label="Mod oscuro" color="inherit">
          { dark ? <Brightness7Icon /> : <Brightness4Icon /> }
        </IconButton>

        <Notifications tournaments={tournaments} />
        <Install />
        <IconButton
          aria-label="mi cuenta"
          aria-controls="menu-appbar"
          aria-haspopup="true"            
          color="inherit"
          onClick={handleClick}
        >
          <Avatar alt={user.displayName} src={user.photoURL} />
        </IconButton> 
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          onClose={handleClose}
        >
          <MenuItem onClick={goProfile} >Mi Cuenta</MenuItem>
          <MenuItem onClick={signOut} >Cerrar Sesion</MenuItem>
        </Menu>       
      </Toolbar>
    </AppBar>
  )
}

export default Header
