import { Box, Container, Fade, Typography } from '@material-ui/core'
import React from 'react'
import ProfileInfo from "../components/Profile";

const Profile = ()  => {
  return (
    <Fade in timeout={{appear: 600, enter: 500}}>
      <Container>
        <Box paddingTop={5}>
          <Typography variant="subtitle2">Mi perfil de entrenador</Typography>
          <ProfileInfo />
        </Box>
      </Container>
    </Fade>
  )
}

export default Profile