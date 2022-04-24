import { Backdrop, Box, Button, CircularProgress, Container, Fab, Fade, makeStyles, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from "react-router-dom";
import { withNotification } from "../../HOC/Notification";
import useTrainee from '../../hooks/useTrainee';
import useTournaments from '../../hooks/useTournaments';
import DialogParticipants from './components/DialogParticipants';
import Options from './components/Options';
import DialogConfirmation from './components/DialogConfirmation';


const useStyle = makeStyles( theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  options: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'    
  },
  table : {
    width: '600px',
    [theme.breakpoints.up('sm')] : {
      width: '100%'
    }
  }
}))

const Tournaments = ({showNotification}) => {  

  const history = useHistory();  
  const classes = useStyle();
  const [submitting, setSubmitting] = useState(false);
  const [dialog, setDialog] = useState({
    opne: false,
    openConfirmation:false,
    id: null,
    type:null,
    topic: null
  });

  const {info: user, tournaments: userTournaments, addTournament, deleteTorunament} = useTrainee();
  const { all: tournaments, erase, open, close, addTrainee, addDemoParticipants} = useTournaments()

  const userInTorurnament = (tID) => userTournaments.find( t => t.tournamentId === tID);

  const addDemoTournament = async (id, participants, kind) => {
    try {
      console.log('error');
      setSubmitting(true);
      await addDemoParticipants(kind,id, participants);
      showNotification('Listo participantes agregados');
      setSubmitting(false);      
    } catch (error) {      
      console.log(error);
      setSubmitting(false);
    }
  }

  const openTournament = async (id) => {
    try {
      setSubmitting(true);
      await open(id);
      showNotification('Listo torneo abierto a inscripciones');
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  }

  const deleteTournament = async (id) => {
    try {
      setSubmitting(true);
      await deleteTorunament(id);
      await erase(id);
      showNotification('Listo torneo eliminado');
      setSubmitting(false);      
    } catch (error) {
      setSubmitting(false);
    }
  }

  const closeTournament = async (id, kind) => {
    try {
      setSubmitting(true);
      await close(id, kind);
      showNotification('Listo torneo cerrado para inscripciones');
      setSubmitting(false);      
    } catch (error) {
      setSubmitting(false);
    }
  }

  const confirmation = (id, type, topic) => {
    setDialog( prevData => ({
      ...prevData,
      openConfirmation: true,
      id, 
      type,
      topic
    }))
  }

  const suscribe = async () => {        
    try {
      if(user.pokemonNick) {
        setDialog( prevData => ({
          ...prevData,
          openConfirmation: false
        }));
        setSubmitting(true);
        await addTournament(dialog.id, dialog.topic);    
        await addTrainee(user, dialog.type, dialog.id);        
        showNotification('Listo ya estas registrado');
        setSubmitting(false);
      } else {
        showNotification('Necesitas tener datos de pokemon go antes de inscribirte', 'info');      
      }      
    } catch (error) {      
      setSubmitting(false);
    }
  }

  const showParticipants = (id) => {    
    setDialog( prevData => ({
      ...prevData,
      open:true,
      id
    }));
  }

  const handleClose = () => {
    setDialog({
      opne: false,
      openConfirmation:false,
      id: null,
      type:null,
      topic:null
    });
  }

  return (
    <Container>
      <Fade in timeout={{appear: 600, enter: 500}}>          
        <Box paddingTop={5}>
          <Typography variant="subtitle1">Torneos</Typography>
          { tournaments.length > 0 && (
            <Fade in timeout={{enter: 800}}>
              <TableContainer component={Paper}>
                <Table className={classes.table} arial-label='Lista de torneos'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Participantes</TableCell>
                      <TableCell></TableCell>              
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      tournaments.map( ({title,kind,participantsCount, id, open, finished, started, topic}) => (
                        <TableRow key={id}>
                          <TableCell>{title}</TableCell>
                          <TableCell>{kind}</TableCell>
                          <TableCell>{participantsCount}</TableCell>
                          <TableCell className={classes.options}>
                            { (open && !finished  && !started && !userInTorurnament(id)) && (                                            
                              <Button 
                                onClick={ () => confirmation(id, kind, topic)}
                                variant="outlined"
                                color='primary'>inscribirme</Button>
                            ) }
                            { (!submitting && !finished && !started && userInTorurnament(id))&& (
                              <Typography>Inscrito</Typography>
                            ) }
                            { (!open  && !finished && !started && !userInTorurnament(id)) && (
                              <Typography>No disponible</Typography>
                            ) }
                            { finished  && !started && (
                              <Typography>Finalizó</Typography>
                            ) }
                            {!open  && started && (
                              <Button 
                                color='primary' 
                                endIcon={<KeyboardArrowRightIcon />}
                                onClick={ () => history.push(`/mistorneos/${id}`) }
                                >Ver</Button>
                            )}
                            { user.admin && (                       
                              <Box display='flex'>
                                <Options 
                                  open={open} 
                                  finished={finished}  
                                  id={id}
                                  participants={participantsCount}
                                  showParticipants={showParticipants}
                                  kind={kind}
                                  addDemo={addDemoTournament}
                                  onClose={closeTournament}  
                                  onOpen={openTournament} 
                                  onDelete={deleteTournament}                  
                                />                                  
                              </Box>
                            ) }
                          </TableCell>              
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Fade>
          ) }
          <Backdrop className={classes.backdrop} open={submitting}>
            <CircularProgress color="inherit" />
          </Backdrop>
          {
            tournaments.length === 0 && (
              <Box textAlign='center'>
                <Typography>No hay torneos disponibles</Typography>
              </Box>
            )
          }
        </Box>
      </Fade>
      <Fragment>
        <DialogParticipants open={dialog.open} id={dialog.id} onClose={handleClose} />      
        <DialogConfirmation open={dialog.openConfirmation} onClose={handleClose} onAccept={suscribe} />
      </Fragment>
      {
        user.admin && (
          <Slide in direction='up' timeout={400}>
            <div className={classes.fab} >
              <Fab
                onClick={() => history.push('/torneo')}                 
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
    </Container>
  )
}

export default withNotification(Tournaments)
