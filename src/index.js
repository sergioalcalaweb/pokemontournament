import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorkerRegistration';
import { Button, Snackbar } from '@material-ui/core';

const AppRender =  () => {

  const [ apppUpdate, setAppUpdate ] = useState({
    newVersion:false,
    waitingWorker: {}
  });

  const onUpdate = (registration) => {
    setAppUpdate({
      waitingWorker: registration && registration.waiting,
      newVersion: true
    })
  }

  const updateServiceWorker = () => {
    const {waitingWorker} = apppUpdate;
    waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
  }

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      serviceWorker.register({ onUpdate: onUpdate });
    }
  }, [])

  return (
    <Fragment>
      <App />
      <Snackbar 
        open={apppUpdate.newVersion} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        message="Hay una nueva version disponible " action={
        <Button color='secondary' onClick={updateServiceWorker}> Actualizar </Button>
      } />
    </Fragment>
  )
}


ReactDOM.render(  
  <AppRender />
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
