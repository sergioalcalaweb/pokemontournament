import { Box, Container, List, ListItem, ListItemAvatar, ListItemText, Paper,  Typography } from '@material-ui/core'
import React from 'react'
import { useHistory } from "react-router-dom";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Battle from '../assets/battle.png'
import Cup from '../assets/cup.png'
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
    <Container>
      <Box mt={2} p={{ xs: 0, sm: 2, md: 4 }}>
        <Typography variant="subtitle2">Mis Torneos</Typography>
        {
          userTorurnaments.length > 0 && (            
            <List component={Paper}>
              {userTorurnaments.map(({title,kind,participantsCount, id, open, finished}) => {
                return (
                  <ListItem key={id} button onClick={ () => handleClick(id,open) } >
                    <ListItemAvatar>
                      <Image path={ kind === 'liga' ? Battle : Cup } alt="Pokemon Cup" style={{ width: 40 }}/>
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
                );
              })}
            </List>
          )
        }
        {
          userTorurnaments.length === 0 && (
            <Box textAlign='center'>
              <Typography>No tienes torneos</Typography>
            </Box>
          )
        }
      </Box>
    </Container>
  )
}

export default MyTournaments
