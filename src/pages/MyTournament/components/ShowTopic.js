import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import Autocomplete from '@mui/lab/Autocomplete';
import React, { useEffect, useState } from 'react'
import useTopics from '../../../hooks/useTopics';
import DetailTopic from '../../../shared/DetailTopic';

const ShowTopic = ({ open, topicDetail , onClose, onSelect }) => {

  const { topics } = useTopics();
  const [ topic, setTopic ] = useState(null);

  useEffect(() => {
    setTopic(null);    
  }, [open])
  
  return (
    <Dialog open={open} onClose={onClose} >
      { !topicDetail && (
        <>
          <DialogTitle>Agregar Temàtica</DialogTitle>
          <DialogContent>    
            <DialogContentText>
              Ve la lista de temáticas disponibles o escribela para que te muestre las temáticas que buscas
            </DialogContentText>    
            <Autocomplete
              freeSolo
              fullWidth
              disableClearable
              options={topics}
              getOptionLabel={(option) => option.name.toUpperCase()}
              onChange={(event, newValue) => {              
                setTopic(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Busca la temática"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: 'search' }}
                />
              )}
            />
            { topic && <DetailTopic topic={topic} />}
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={onClose}
              size="small">
              Cerrar
            </Button>
            <Button 
              disabled={!topic}
              onClick={ () => onSelect(topic) }
              size="small">
              Agregar
            </Button>
          </DialogActions>
        </>
      )}
      { topicDetail && (
        <>
          <DialogTitle>{topicDetail.name}</DialogTitle>
          <DialogContent>    
            <DetailTopic topic={topicDetail} />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={onClose}
              size="small">
              Cerrar
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}

export default ShowTopic
