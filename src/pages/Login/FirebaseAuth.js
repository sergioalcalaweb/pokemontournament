import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Typography } from '@mui/material'
import { useAuth } from 'reactfire'

const FirebaseAuth = () => {

  const auth = useAuth;
  const firebaseAuthConfig = {
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
      auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/home',
    credentialHelper: 'none',
  }
  return (
    <React.Fragment>
      <Typography component="h1">Bienvenido Entrenador</Typography>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={auth()}
      />
    </React.Fragment>
  )
}

export default FirebaseAuth