import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Typography } from '@material-ui/core'
import { useAuth } from 'reactfire'


const FirebaseAuth = () => {
  const auth = useAuth;
  const firebaseAuthConfig = {
    signInFlow: 'popup',  
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/',
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