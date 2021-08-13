import { Accordion, AccordionActions, AccordionDetails, AccordionSummary,  Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Fade, makeStyles, Paper, Slide, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Topic from '../components/Topic';
import { withNotification } from '../HOC/Notification';
import useTopics from '../hooks/useTopics';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DetailTopic from '../components/DetailTopic';


const useStyles = makeStyles((theme) => ({
  large: {
    width: '120px',
    height: '120px',
  },
  error: {
    color: 'red'
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },

}));

const Topics = ({showNotification}) => {

  const classes = useStyles();
  const { topics, addTopic, updateTopic, deleteTopic } = useTopics();
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [topic, setTopic] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setConfirm(false);
    setTopic(null);
  }
  const handleOpen = () => setOpen(true);
  const handleEdit = (topic) => {    
    setTopic(topic);
    setOpen(true);
  }

  const handleConfirm = (topic) => {
    setConfirm(true);
    setTopic(topic);
  };

  const onSave = async (topic) => {
    try {      
      setOpen(false);
      if(topic.id) {
        await updateTopic(topic);
        showNotification('Listo temática actualizada');
      }else {
        await addTopic(topic);
        showNotification('Listo temática agregada');
      }
    } catch (error) {
      showNotification('Ups algo salio mal vuelve a intentarlo', 'info'); 
    }
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = async () => {
    try {      
      setOpen(false);
      setConfirm(false);
      await deleteTopic(topic.id);
      showNotification('Temática eliminada');      
    } catch (error) {
      showNotification('Ups algo salio mal vuelve a intentarlo', 'info'); 
    }
  }

  return (
    <Fade in timeout={{appear: 600, enter: 500}}>
      <Container>
        <Box component='div' paddingTop={5}>
          <Typography variant="subtitle1">Temáticas</Typography>
          {
            topics.map( (topic, index) =>  (
              <Accordion expanded={ expanded === `panel${index}` } onChange={ handleChange(`panel${index}`) } key={topic.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={topic.name}
                >
                  <Typography style={{ textTransform:'uppercase' }}>{topic.name}</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ flexDirection:'column' }}>
                  <DetailTopic topic={topic} />
                </AccordionDetails>
                <AccordionActions>
                  <Button 
                    size="small"
                    onClick={ () => handleConfirm(topic) }
                    className={classes.error}>
                    Eliminar
                  </Button>
                  <Button 
                    size="small" 
                    onClick={ () => handleEdit(topic) }
                    color="primary">
                    Cambiar
                  </Button>
                </AccordionActions>
              </Accordion>
            ))
          }

          {
            topics.length > 0 && (
              <Slide in direction='up' timeout={400}>
                <div className={classes.fab} >
                  <Fab
                    onClick={handleOpen}                 
                    color="secondary" 
                    variant='extended'
                    aria-label="add">
                    <AddIcon />
                    Agregar
                  </Fab>
                </div>
              </Slide>
            )
          }

          {
            topics.length === 0 && (
              <Box component={Paper} p={5} textAlign='center'>
                <Typography style={{marginBottom:'1rem'}} variant='subtitle2'>No tienes temáticas</Typography>
                <Button onClick={handleOpen} color='primary' variant='outlined'>Crear Temática</Button>
              </Box>
            )
          }
          <Topic open={open} topicValue={topic} onClose={handleClose} onSave={onSave} />
        </Box>
        <Dialog open={confirm} onClose={handleClose}>
          <DialogTitle>Borrar temàtica</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Seguro que quieres eliminar esta temàtica
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} >
              Cancelar
            </Button>
            <Button onClick={handleDelete} className={classes.error}  autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Fade>
  )
}

export default withNotification(Topics)
