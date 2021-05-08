import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import React, { useState } from 'react'

export const withNotification = Component => {

  return props => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(6000);
    const [severity, setSeverity] = useState("success"); 

    const showMessage = (message, severity = "success", duration = 6000) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    return (
      <>
        <Component {...props} showNotification={showMessage} />
        <Snackbar 
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}>
          <MuiAlert variant="filled" severity={severity}>
            {message}
          </MuiAlert>
        </Snackbar>
      </>
    )

  }
}
