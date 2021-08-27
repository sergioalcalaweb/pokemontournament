import { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useMessaging } from 'reactfire';
import useTrainee from '../../../hooks/useTrainee';
import NotificationsIcon from '@material-ui/icons/Notifications';


const Push = () => {

  const messaging =   useMessaging();
  const { info:{ devices }, addDevice, deleteDevice } = useTrainee();
  const [isTokenFound, setTokenFound] = useState(false);  
  const [token, setToken] = useState(false);  
  const status = Notification.permission;

  useEffect(() => { 
    
    const getToken = () => {
      messaging
        .getToken({vapidKey:process.env.REACT_APP_FCM})
        .then(
          token => {
            setToken(token); 
            if(devices.includes(token)) {
              setTokenFound(true);              
            }
          }
        )

    }
      
    
    if(status === 'default') {
      console.log('default');
    } else if(status === 'denied') {
      console.log('denied');
    } else if (status === 'granted') {
      getToken();
    }    
  }, [messaging, status, devices])
  
  const checkToken = async () => {
    try {
      const token = await messaging.getToken({vapidKey:process.env.REACT_APP_FCM});
      setTokenFound(true);
      setToken(token);      
      if(!devices.includes(token)) {
        await addDevice(token);
      }
    } catch (error) {      
      setTokenFound(false);
    }    
  }

  const handleChange = async (event) => {    
    if(!isTokenFound) {
      if(status === 'denied') {
        alert('Tienes bloqueadas las notificaciones desbloquealas para recibir notificaciones');
        return; 
      }
      checkToken();      
    } else {      
      setTokenFound(false);
      await deleteDevice(token);    
      await messaging.deleteToken();      
    }
  }

  return (
    <ListItem>
      <ListItemIcon>
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-wifi" primary="Recibir notificaciones en este dispositivo" />
      <ListItemSecondaryAction>
        <Switch
          edge="end"   
          onChange={handleChange}                   
          inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
          checked={isTokenFound}
        />
      </ListItemSecondaryAction>
    </ListItem> 
    
  )
}

export default Push;


