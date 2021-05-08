import React from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import { Typography } from '@material-ui/core'

const firebaseAuthConfig = {
  signInFlow: 'popup',  
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '/',
  credentialHelper: 'none',
}

const FirebaseAuth = () => {

  return (
    <React.Fragment>
      <Typography component="h1">Bienvenido Entrenador</Typography>
      <StyledFirebaseAuth
        uiConfig={firebaseAuthConfig}
        firebaseAuth={firebase.auth()}
      />
    </React.Fragment>
  )
}

export default FirebaseAuth