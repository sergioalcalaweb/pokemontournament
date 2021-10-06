import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import FileCopyIcon from '@mui/icons-material/FileCopy';

const Trainee = ({open, onClose, trainee}) => {

  const {pokemonNick, pokemonID, photoURL } = trainee;
  const [copied, setCopied] = useState(false);

  const copy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout( () => setCopied(false), 2000 );
  }
  return (
    <Dialog open={open}  onClose={onClose}>
      <DialogTitle>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Avatar alt={pokemonNick} src={photoURL}/>          
          <Typography variant='subtitle1'>{pokemonNick}</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Typography variant='caption'>Pokemon ID</Typography>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Box>
              <Typography>{pokemonID}</Typography>
            </Box>
            <IconButton onClick={ () => copy(pokemonID)}> 
              <FileCopyIcon />
            </IconButton>
          </Box>
          { copied && <Typography align='center' color='primary'>Copiado !!</Typography> }
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent:'center' }} >
        <Button onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Trainee
