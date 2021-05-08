import { Box, Container, Typography } from '@material-ui/core'
import React from 'react'
import ProfileInfo from "../components/Profile";

const Profile = ()  => {
  return (
    <Container>
      <Box mt={2} p={2}>
        <Typography variant="subtitle2">Mi perfil de entrenador</Typography>
        <ProfileInfo />
      </Box>
    </Container>
  )
}

export default Profile