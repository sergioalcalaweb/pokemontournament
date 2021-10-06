import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from "react-hook-form";

const MatchResult = ({open, match, onClose, onSave }) => {

  const { register, handleSubmit, errors, setError } = useForm();

  const saveMatch = (resultData) => {   
    if(resultData.homeResult === 0 && resultData.awayResult === 0) {
      setError('homeResult', {
        type: 'manual',
        message: 'Resultado invalido'
      })
      return;
    }
    const resultMatch = {
      ...match,
      ...resultData
    }
    onSave(resultMatch);
  }
  
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Agregar Resultado</DialogTitle>
      <DialogContent>
        <Box display='flex' flexDirection='row' alignItems='baseline'>
          <TextField
            error={!!errors.homeResult}
            label={match.home}                                
            name='homeResult'
            defaultValue={0}
            variant='outlined'
            type='number'
            inputProps={{ 'pattern': '[0-9]*' }}
            fullWidth
            inputRef={ register({
              required:'El campo es obligatorio',
              min:{
                value: 0,
                message: 'El valor minimo es 0'
              },
              max:{
                value: 4,
                message: 'El valor maximo posible es 4'
              },
              valueAsNumber: true,
            })}
            helperText={errors.homeResult ? errors.homeResult.message :'Local'}                
          />
          <Typography style={{ padding:3 }}>VS</Typography>
          <TextField 
            error={!!errors.awayResult}
            label={match.away}                                
            name='awayResult'
            defaultValue={0}
            variant='outlined'
            type='number'
            inputProps={{ 'pattern': '[0-9]*' }}
            fullWidth 
            inputRef={ register({
              required:'El campo es obligatorio',
              min:{
                value: 0,
                message: 'El valor minimo es 0'
              },
              max:{
                value: 4,
                message: 'El valor maximo posible es 4'
              },
              valueAsNumber: true,
            })}             
            helperText={errors.awayResult ? errors.awayResult.message :'Visitante'}                
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(saveMatch)} color="primary" autoFocus>
          Agregar Resultado
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MatchResult
