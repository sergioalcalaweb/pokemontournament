import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide, Typography } from '@mui/material'
import React, { forwardRef, useContext, useState } from 'react'
import Logo from "../../../assets/logo.png";
import useTrainee from '../../../hooks/useTrainee';
import Image from '../../../components/Image';
import UserProfile from '../../../shared/UserProfile';
import { AppContext } from '../../../context/AppContext';
import { makeStyles } from '@mui/styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
    padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)'
  },
}));

const Welcome = () => {
  const classes = useStyles();
  const { toggleWelcome } =  useContext(AppContext);
  const [open , setOpen] = useState(true);
  const {info:{pokemonID}} = useTrainee();

  return (
    <Dialog className={classes.root} fullScreen open={open} TransitionComponent={Transition}>
      <DialogTitle>Bienvenido entrenador</DialogTitle>
      <DialogContent>
        <Box textAlign='center' mb={2}>
          <Image path={Logo}  />
          <Typography>Antes de comenzar agrega tus datos de pokemon GO para poder inscribirte a nuestros torneos y puedas vivir la experiencia completa </Typography>
        </Box>
        <UserProfile onSave={ () => setOpen(false)} />
      </DialogContent>
      <DialogActions>        
        <Button onClick={ () => {
          setOpen(false); 
          toggleWelcome();
          }}>
          {pokemonID ? 'Cerrar':'Omitir'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Welcome
