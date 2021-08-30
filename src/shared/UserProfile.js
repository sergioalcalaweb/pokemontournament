import { Avatar, Button, Card, CardActions, CardContent, CardHeader,  makeStyles, Snackbar, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import MuiAlert from '@material-ui/lab/Alert';
import useTrainee from '../hooks/useTrainee';

const useStyles = makeStyles( (theme) => ({
  form: {
    marginTop: theme.spacing(1),
    display:'flex',
    flexDirection: 'column',
    justifyContent:'space-between',
    [theme.breakpoints.up('sm')]: {
      flexDirection:'row',
    }
  },
  input: {
    width:'100%',    
    marginTop:15,
    [theme.breakpoints.up('sm')]: {
      width:'49%',    
    }
  },
  actions: {
    justifyContent: 'flex-end'
  }
} ));

const UserProfile = ({ onSave = null}) => {
  
  const { register, handleSubmit, errors, setValue, formState: { isSubmitting } } = useForm();
  const classes = useStyles();
  const [open, setOpen ] = useState(false);
  const { info: user, update } =  useTrainee();
  
  const onSubmit = async (formData) => {    
    await update(formData);
    setOpen(true);
    if(onSave) {
      onSave();
    }
  }
  return (
    <Card>
      <CardHeader 
        avatar={
          <Avatar alt={user.displayName} src={user.photoURL} />
        }
        title={user.displayName}
        subheader={user.email}
      />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <CardContent>
            <Typography>Mis Datos de Pokémon GO</Typography>
            <div className={classes.form}>
              <TextField 
                error={!!errors.pokemonID}
                label='Codigo de entrenador'                                
                name='pokemonID'
                defaultValue={user.pokemonID}
                variant='outlined'
                fullWidth
                onBlur={ (e) => {
                  setValue('pokemonID', e.target.value.replace(/\s/g, ""));
                } }     
                inputRef={ register({
                  required:'El campo es obligatorio',
                  pattern: {
                    value: /^[\d]{4}(\s)?[\d]{4}(\s)?[\d]{4}(\s)?$/,
                    message: 'Formato Incorrecto de Codigo'
                  }
                })}           
                className={classes.input}
                helperText={errors.pokemonID?.message}
              />
              <TextField
                error={!!errors.pokemonNick}                 
                label='Nombre de Usuario'
                name='pokemonNick'
                defaultValue={user.pokemonNick}
                variant='outlined'
                fullWidth  
                inputRef={ register({
                  required:'El campo es obligatorio'
                }) }  
                helperText={errors.pokemonNick?.message}           
                className={classes.input}
              />
            </div>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button 
            disabled={isSubmitting}
            type='submit'
            variant="contained" 
            color='primary'>
            { user.pokemonID ? 'Actualizar' : 'Guardar' }
          </Button>        
        </CardActions>        
      </form>
      <Snackbar 
        open={open}
        >
        <MuiAlert variant='filled' severity="success">
          Usuario {user.pokemonID ? 'actualizado': 'guardado' } correctamente
        </MuiAlert>
      </Snackbar>
    </Card>
  )

}

export default UserProfile
