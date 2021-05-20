import { Box, Container, Fade, FormControlLabel, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Paper,  Switch,  Typography } from '@material-ui/core'
import React from 'react'
import Image from '../components/Image'
import useTrainee from '../hooks/useTrainee';


const Users = () => {  
  
  const { users, toggleAdmin } = useTrainee();    
  const toggleChecked = async (id, admin) => {
    await toggleAdmin(id, !admin);
  };

  return (
    <Fade in timeout={{appear: 600, enter: 500}}>
      <Container>
        <Box paddingTop={5}>
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
    </Fade>
  )
}

export default Users
