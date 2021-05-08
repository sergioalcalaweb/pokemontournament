import { AppBar, Avatar, Badge, ButtonBase, IconButton, makeStyles, Menu, MenuItem, Toolbar } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth, useUser } from 'reactfire';
import Image from '../Image'
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from "../../assets/logo.png";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
  },
}));

const Header = () => {

  const classes = useStyles();
  const { data: user } = useUser();
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
    history.push('/login');
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
    <AppBar className={classes.appBar} elevation={0} position="static">
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
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton
          aria-label="account of current user"
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
