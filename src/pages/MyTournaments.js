import { Box, Button, Container, Fade, List, ListItem, ListItemAvatar, ListItemText, Paper,  Slide,  Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from "react-router-dom";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Battle from '../assets/tournaments/Battle_League_Great.png'
import Cup from '../assets/tournaments/GO_Battle_League.png'
import Image from '../components/Image'
import useTrainee from '../hooks/useTrainee';
import useTournaments from '../hooks/useTournaments';


const MyTournaments = () => {  
  let history = useHistory();
  const { tournaments : myTournaments } = useTrainee();
  const { all: tournaments } = useTournaments();
  const userTorurnaments = tournaments.filter( t => myTournaments.find( mt => mt.tournamentId === t.id) );  

  const handleClick = (id, open) => {    
    if(!open) {
      history.push(`/mistorneos/${id}`)
    }
  }

  return (
    <Fade in timeout={{appear: 600, enter: 500}}>
      <Container>
        <Box paddingTop={5}>
          <Typography variant="subtitle1">Mis Torneos</Typography>
          {
            userTorurnaments.length > 0 && (  
                <List component={Paper}>
                  {userTorurnaments.map(({title,kind,participantsCount, id, open, finished}, index) => {
                    return (
                      <Slide in key={id} >
                        <ListItem  button onClick={ () => handleClick(id,open) } >
                          <ListItemAvatar>
                            <Image path={ kind === 'liga' ? Battle : Cup } alt="Pokemon Cup" style={{ width: 40, filter:`grayscale(${ !open ? '0' : '100%'})` }}/>
                          </ListItemAvatar>
                          <ListItemText 
                            id={id} 
                            primary={title} 
                            secondary={
                              <React.Fragment>
                                <Typography component='span' style={{ textTransform:'capitalize' }}>
                                  {kind} - Participantes: {participantsCount} { open && '- Aun no cierran inscripciones' }
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          <KeyboardArrowRightIcon />
                        </ListItem>
                      </Slide>
                    );
                  })}
                </List>        
            )
          }
          {
            userTorurnaments.length === 0 && (
              <Box component={Paper} p={5} textAlign='center'>
                <Typography style={{marginBottom:'1rem'}} variant='subtitle2'>No tienes torneos</Typography>
                <Button onClick={ () => history.push(`/torneos`)} color='primary' variant='outlined'>Ver torneos disponibles</Button>
              </Box>
            )
          }
        </Box>
      </Container>
    </Fade>
  )
}

export default MyTournaments
