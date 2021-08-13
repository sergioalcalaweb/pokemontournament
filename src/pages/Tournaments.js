import { Backdrop, Box, Button, CircularProgress, Container, Fab, Fade, IconButton, makeStyles, Menu, MenuItem, Paper, Slide, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from "react-router-dom";
import { withNotification } from "../HOC/Notification";
import useTrainee from '../hooks/useTrainee';
import useTournaments from '../hooks/useTournaments';
import DialogParticipants from '../components/DialogParticipants';


const IsolatedMenu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return(
    <React.Fragment>
      <IconButton
      aria-label="mas opciones"
      aria-controls="long-menu"
      aria-haspopup="true"
      onClick={event => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => {
            setAnchorEl(null);          
            props.onDelete(props.id);
        }}>Eliminar</MenuItem>        
        { (props.open && !props.finished) && (
          <MenuItem onClick={() => {
              setAnchorEl(null);          
              props.onClose(props.id, props.kind);
          }}>Cerrar Inscripciones</MenuItem>          
        )}
        { (props.open && !props.finished) && (
          <MenuItem onClick={() => {
            setAnchorEl(null);          
            props.addDemo(props.id, props.participants, props.kind);
          }}>Participantes DEMO</MenuItem>          
        )}
        { (props.open && !props.finished) && (
          <MenuItem onClick={() => {
            setAnchorEl(null);          
            props.showParticipants(props.id);
          }}>Ver Participantes</MenuItem>          
        )}
        { (!props.open && !props.finished) && 
          <MenuItem onClick={() => {
            setAnchorEl(null);   
            props.onOpen(props.id);  
          }}>Abrir Inscripciones</MenuItem>
        }
      </Menu>

    </React.Fragment>
  )
}


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
    id: null
  });
  const {info: user, tournaments: userTournaments, addTournament, deleteTorunament} = useTrainee();
  const { all: tournaments, erase, open, close, addTrainee, addDemoParticipants} = useTournaments()

  const userInTorurnament = (tID) => userTournaments.find( t => t.tournamentId === tID);

  const addDemoTournament = async (id, participants, kind) => {
    try {
      setSubmitting(true);
      await addDemoParticipants(kind,id, participants);
      showNotification('Listo participantes agregados');
      setSubmitting(false);      
    } catch (error) {
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

  const suscribe = async (id, type, participants) => {        
    try {
      if(user.pokemonNick) {
        setSubmitting(true);
        await addTournament(id);    
        await addTrainee(user, type, id, participants);        
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
    setDialog({
      open:true,
      id
    });
  }

  const handleClose = () => {
    setDialog({
      open:false,
      id:null
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
                      tournaments.map( ({title,kind,participantsCount, id, open, finished, started}) => (
                        <TableRow key={id}>
                          <TableCell>{title}</TableCell>
                          <TableCell>{kind}</TableCell>
                          <TableCell>{participantsCount}</TableCell>
                          <TableCell className={classes.options}>
                            { (open && !finished  && !started && !userInTorurnament(id)) && (                                            
                              <Button 
                                onClick={ () => suscribe(id, kind, participantsCount)}
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
                                <IsolatedMenu 
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
      <DialogParticipants open={dialog.open} id={dialog.id} onClose={handleClose} />      
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
