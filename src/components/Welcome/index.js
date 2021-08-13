import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Slide, Typography } from '@material-ui/core'
import React, { forwardRef, useState } from 'react'
import Profile from '../Profile';
import Logo from "../../assets/logo.png";
import Image from '../Image';
import useTrainee from '../../hooks/useTrainee';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
  },
}));

const Welcome = () => {
  const classes = useStyles();
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
        <Profile onSave={ () => setOpen(false)} />
      </DialogContent>
      <DialogActions>        
        <Button onClick={ () => setOpen(false)}>
          {pokemonID ? 'Cerrar':'Omitir'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Welcome
