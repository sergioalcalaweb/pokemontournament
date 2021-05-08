import { Box, Container, FormControlLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper,  Switch,  Typography } from '@material-ui/core'
import React from 'react'
import Image from '../components/Image'
import useTrainee from '../hooks/useTrainee';


const Users = () => {  
  
  const { users, toggleAdmin } = useTrainee();    
  const toggleChecked = async (id, admin) => {
    await toggleAdmin(id, !admin);
  };

  return (
    <Container>
      <Box mt={2} p={{ xs: 0, sm: 2, md: 4 }}>
        <Typography variant="subtitle2">Usuarios</Typography>
        <List component={Paper}>
          {users.map(({admin, displayName, pokemonNick, id, photoURL}) => {
            return (
              <ListItem key={id} >
                <ListItemAvatar>
                  <Image path={photoURL} alt="Trainee" style={{ width: 40 }}/>
                </ListItemAvatar>
                <ListItemText 
                  id={id} 
                  primary={displayName} 
                  secondary={pokemonNick}
                />
                <ListItemSecondaryAction>
                  <FormControlLabel
                    control={<Switch checked={admin} onChange={ () => toggleChecked(id, admin) } />}
                    label="Admin"
                  />
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  )
}

export default Users
