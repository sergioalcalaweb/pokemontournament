import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

const DialogConfirmation = ({open = false, onClose, onAccept}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Inscripción</DialogTitle>
      <DialogContent>        
        <DialogContentText>
          Seguro que quieres quitar este resultado?
        </DialogContentText>
      </DialogContent>
      <DialogActions>        
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onAccept} color="primary" autoFocus>
          Si 
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogConfirmation
