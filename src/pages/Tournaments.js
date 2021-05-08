import { Box, Button, Container, Fab, IconButton, makeStyles, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from "react-router-dom";
import { withNotification } from "../HOC/Notification";
import useTrainee from '../hooks/useTrainee';
import useTournaments from '../hooks/useTournaments';


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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  options: {
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'    
  },
  table : {
    width: '1000px',
    [theme.breakpoints.up('sm')] : {
      width: '100%'
    }
  }
}))

const Tournaments = ({showNotification}) => {  

  let history = useHistory();
  const classes = useStyle();
  const [submitting, setSubmitting] = useState(false);
  const {info: user, tournaments: userTournaments, addTournament, deleteTorunament} = useTrainee();
  const { all: tournaments, erase, open, close, addTrainee, addDemoParticipants} = useTournaments()

  const userInTorurnament = (tID) => userTournaments.find( t => t.tournamentId === tID);

  const addDemoTournament = async (id, participants, kind) => {
    setSubmitting(true);
    await addDemoParticipants(kind,id, participants);
    showNotification('Listo participantes agregados');
    setSubmitting(false);
  }

  const openTournament = async (id) => {
    setSubmitting(true);
    await open(id);
    showNotification('Listo torneo abierto a inscripciones');
    setSubmitting(false);
  }

  const deleteTournament = async (id) => {
    setSubmitting(true);
    await deleteTorunament(id);
    await erase(id);
    showNotification('Listo torneo eliminado');
    setSubmitting(false);
  }

  const closeTournament = async (id, kind) => {
    setSubmitting(true);
    await close(id, kind);
    showNotification('Listo torneo cerrado para inscripciones');
    setSubmitting(false);
  }

  const suscribe = async (id, type, participants) => {    
    setSubmitting(true);
    await addTournament(id);    
    await addTrainee(user,type, id, participants)
    showNotification('Listo ya estas registrado');
    setSubmitting(false);
  }

  return (
    <Container>
      <Box mt={2} p={{ xs: 0, sm: 2, md: 4 }}>
        <Typography variant="subtitle2">Torneos</Typography>
        { tournaments.length > 0 && (
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
                  tournaments.map( ({title,kind,participantsCount, id, open, finished}) => (
                    <TableRow key={id}>
                      <TableCell>{title}</TableCell>
                      <TableCell>{kind}</TableCell>
                      <TableCell>{participantsCount}</TableCell>
                      <TableCell align='center' className={classes.options}>
                        { (open && !finished && !submitting && !userInTorurnament(id)) && (                                            
                          <Button 
                            onClick={ () => suscribe(id, kind, participantsCount)}
                            variant="outlined"
                            color='primary'>inscribirme</Button>
                        ) }
                        { (!submitting && !finished && userInTorurnament(id))&& (
                          <Typography>Inscrito</Typography>
                        ) }
                        { (!open && !submitting && !finished && !userInTorurnament(id)) && (
                          <Typography>No disponible</Typography>
                        ) }
                        { finished && !submitting && (
                          <Typography>Finalizó</Typography>
                        ) }
                        { submitting && (
                          <Typography>Un momento...</Typography>
                        ) }
                        { user.admin && (                       
                          <IsolatedMenu 
                            open={open} 
                            finished={finished}  
                            id={id}
                            participants={participantsCount}
                            kind={kind}
                            addDemo={addDemoTournament}
                            onClose={closeTournament}  
                            onOpen={openTournament} 
                            onDelete={deleteTournament}                  
                          />    
                        ) }
                      </TableCell>              
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        ) }
        {
          tournaments.length === 0 && (
            <Box textAlign='center'>
              <Typography>No hay torneos disponibles</Typography>
            </Box>
          )
        }
        {
          user.admin && (
            <Fab
              onClick={() => history.push('/torneo')} 
              className={classes.fab} 
              color="secondary" 
              aria-label="add">
              <AddIcon />
            </Fab>
          )
        }
      </Box>
    </Container>
  )
}

export default withNotification(Tournaments)
