import { Badge, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { Fragment, useState } from 'react'
import { useMessaging } from 'reactfire';
import useTrainee from '../../hooks/useTrainee';
import { useHistory } from "react-router-dom";

const Notifications = () => {
  
  const history = useHistory();
  const messaging =   useMessaging();
  const { info, addDevice, notifications } = useTrainee();
  const [isTokenFound, setTokenFound] = useState(false);  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if(!isTokenFound) {
      checkToken();
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (url) => {
    handleClose();
    history.push(url);
  }

  const checkToken = async () => {
    try {
      const token = await messaging.getToken({vapidKey:process.env.REACT_APP_FCM});
      setTokenFound(true);
      if(!info.devices.includes(token)) {
        await addDevice(token);
      }
    } catch (error) {
      setTokenFound(false);
    }    
  }

  messaging.onMessage( payload => {
    console.log('Message received. ', payload);    
  });

  return (
    <Fragment>
      <IconButton 
        onClick={handleClick}
        aria-label="ver notificaciones" 
        color="inherit">
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        {
          notifications.map( (notification) => (            
            <MenuItem key={notification.id} onClick={() => goTo(notification.url)} style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
              <Typography variant='body1'>{notification.title}</Typography>
              <Typography variant='caption'>{notification.body}</Typography>
            </MenuItem>
          ))
        }
      </Menu>
    </Fragment>
  )
}

export default Notifications;


