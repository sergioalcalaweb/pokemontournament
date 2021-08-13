import { IconButton, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import GetAppIcon from '@material-ui/icons/GetApp';

const Install = () => {
  const [visible, setVisible] = useState(false);
  const [deferred, setDeferred] = useState(null);

  useEffect(() => {

    const handlerInstall = e => {
      e.preventDefault();
      setDeferred(e);
      setVisible(true);      
      console.log(`'beforeinstallprompt' event was fired.`);
    }

    const handlerReady = () => {
      setDeferred(null);
      setVisible(false);     
      console.log('PWA was installed');
    }
    window.addEventListener('beforeinstallprompt', handlerInstall);
    window.addEventListener('appinstalled', handlerReady);

    return () => {
      window.removeEventListener("transitionend", handlerInstall)
      window.removeEventListener("transitionend", handlerReady)
    }
  }, [])

  const install = async () => {
    deferred.prompt();
    const { outcome } = await deferred.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    setDeferred(null);
  }

  if(!visible) {
    return null;
  }

  return (
    <Tooltip title="Instalar App" aria-label="instalar app">
      <IconButton onClick={install} aria-label="Instalar" color="inherit">
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  )
}

export default Install
