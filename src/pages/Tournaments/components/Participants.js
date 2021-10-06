
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@mui/material';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import useTournament from '../../../hooks/useTournament';


const Participants = ({id}) => {  
  const { participants,participantsCup, detail:{kind}, deleteParticipant } = useTournament(id);
  const handleDelete = (user) => {  
    deleteParticipant(user);
  }
  
  return (
    <List>
      { kind === 'liga' && participants.map( participant => (
        <ListItem key={participant.id}>
          <ListItemAvatar>
            <Avatar alt={participant.pokemonNick} src={participant.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={participant.pokemonNick}
          />
          <ListItemSecondaryAction>
            <IconButton 
              onClick={ () => handleDelete(participant) }
              edge="end" 
              aria-label="eliminar">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) )}
      { kind === 'copa' && participantsCup.map( participant => (
        <ListItem key={participant.id}>
          <ListItemAvatar>
            <Avatar alt={participant.pokemonNick} src={participant.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={participant.pokemonNick}
          />
          <ListItemSecondaryAction>
            <IconButton 
              onClick={ () => handleDelete(participant) }
              edge="end" 
              aria-label="eliminar">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ) )}
    </List>
  )
}

export default Participants
