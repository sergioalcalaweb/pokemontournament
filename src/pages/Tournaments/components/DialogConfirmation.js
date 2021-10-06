import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

const DialogConfirmation = ({open = false, onClose, onAccept}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Inscripción</DialogTitle>
      <DialogContent>        
        <DialogContentText>
            Al inscribirme a este torneo acepto que leí <Link component={RouterLink} to='/reglas'>el reglamento</Link> y que estoy de acuerdo con los lineamientos que en ella se describen.
        </DialogContentText>
      </DialogContent>
      <DialogActions>        
        <Button onClick={onClose} color="primary">
          Reachazar
        </Button>
        <Button onClick={onAccept} color="primary" autoFocus>
          Aceptar 
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmation
