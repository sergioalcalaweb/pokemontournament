import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import Finals from './Finals';
import Positions from './Positions'
import Schedules from './Schedules'
import useTrainee from '../../../hooks/useTrainee'
import useTournament from '../../../hooks/useTournament'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
  }
}));

const League = ({id}) => {
  const classes = useStyles();
  const tournament = useTournament(id);
  const { info: trainee } = useTrainee();
  const [value, setValue] = useState(tournament.detail.finals ? 'finals' :'positions');

  const handleChange = (event, newValue) => {  
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Tabs value={value} variant='fullWidth' onChange={handleChange} aria-label="Detalle del torneo">
          { tournament.detail.finals &&  <Tab value='finals' label="Liguilla"/>}
          <Tab value='positions' label="Tabla" />
          { !tournament.detail.finals && <Tab value='schedules' label="Jornadas"/>}
        </Tabs>
      </AppBar>
      { value === 'finals' && <Finals admin={trainee.admin} trainee={trainee.pokemonNick} {...tournament} />}
      { value === 'positions' && <Positions admin={trainee.admin} {...tournament} />}
      { value === 'schedules' && <Schedules user={trainee} {...tournament} />}
    </React.Fragment>
  )
}

export default League
