import React, { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Typography } from '@material-ui/core'
import { useAuth } from 'reactfire'


const FirebaseAuth = () => {

  const [signInFlow, setSignInFlow] = useState('popup');

  useEffect(() => {    
    if (('standalone' in window.navigator)
        && window.navigator.standalone){
      setSignInFlow('redirect')
    };
  }, [])

  const auth = useAuth;
  const firebaseAuthConfig = {
    signInFlow: signInFlow,
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
      auth.TwitterAuthProvider.PROVIDER_ID
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