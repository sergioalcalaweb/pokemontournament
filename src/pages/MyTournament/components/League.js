import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import _ from 'lodash';
import Finals from './Finals';
import Positions from './Positions'
import Schedules from './Schedules'
import useTrainee from '../../../hooks/useTrainee'

const useStyles = makeStyles((theme) => ({
  appBar: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
    top:'calc( 64px + env(safe-area-inset-top) )'
  }
}));

const League = ({ tournament }) => {
  const classes = useStyles();  
  const { info: trainee } = useTrainee();
  const [value, setValue] = useState(tournament.detail.finals ? 'finals' :'positions');

  const shedules = _.groupBy(tournament.matchs,'day');
  const days = Object.keys(shedules);

  const handleChange = (event, newValue) => {  
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.appBar} position='sticky'>
        <Tabs value={value} variant='fullWidth' onChange={handleChange} aria-label="Detalle del torneo">
          { tournament.detail.finals &&  <Tab value='finals' label="Liguilla"/>}
          <Tab value='positions' label="Tabla" />
          { !tournament.detail.finals && <Tab value='schedules' label="Jornadas"/>}
        </Tabs>
      </AppBar>
      { value === 'finals' && <Finals admin={trainee.admin} trainee={trainee.pokemonNick} {...tournament} />}
      { value === 'positions' && <Positions admin={trainee.admin} {...tournament} />}
      { value === 'schedules' && <Schedules user={trainee} {...tournament} shedules={shedules} days={days} />}
    </React.Fragment>
  )
}

export default League
