
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
import useTournament from '../../../hooks/useTournament';


const Participants = ({id}) => {  
  const { participants, deleteParticipant } = useTournament(id);
  const handleDelete = (user) => {  
    deleteParticipant(user);
  }

  return (
    <List>
      {participants.map( participant => (
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
