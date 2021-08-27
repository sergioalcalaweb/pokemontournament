import { Box, Container, Fade, List, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { messaging } from 'reactfire';
import Push from './components/Push';
import UserProfile from '../../shared/UserProfile'

const Profile = ()  => {
  return (
    <Fade in timeout={{appear: 600, enter: 500}}>
      <Container>
        <Box paddingTop={5}>
          <Box display='flex' flexDirection={{ xs:"column", md:"row" }} justifyContent='space-between'>
            <Box mb={4} p={{ xs:0, md:1 }} flexGrow={1}>
              <Typography variant="subtitle2">Mi perfil de entrenador</Typography>
              <UserProfile />
            </Box>
            { messaging.isSupported() && (
              <Box flexGrow={1} p={{ xs:0, md:1 }}>
                <Typography variant="subtitle2">Configuración</Typography>
                <Box component={Paper}>
                  <List>
                    <Push />                  
                  </List>
                </Box>
              </Box>
            ) }
          </Box>
          
        </Box>
      </Container>
    </Fade>
  )
}

export default Profile