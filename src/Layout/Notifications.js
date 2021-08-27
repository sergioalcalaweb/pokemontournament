import { Badge, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom';
import useNotifications from '../hooks/useNotifications';

const Notifications = ({tournaments}) => {  

  const history = useHistory();  
  const tournamentsTopic = tournaments.map( tournament => tournament.topic );
  const { notifications } = useNotifications(tournamentsTopic);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goTo = (url) => {
    handleClose();
    history.push(url);
  }
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
        { notifications.length === 0 && (
          <MenuItem>
            <Typography variant='body1'>Sin notificaciones</Typography>            
          </MenuItem>
        )}
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