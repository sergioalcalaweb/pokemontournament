import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import Participants from './Participants'

const DialogParticipants = ({id, open = false, onClose}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>Lista de participantes</DialogTitle>
      <DialogContent>        
        { id && <Participants id={id} /> }        
      </DialogContent>
      <DialogActions>        
        <Button onClick={onClose}>
          cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogParticipants
