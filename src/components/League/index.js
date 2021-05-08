import { AppBar, makeStyles, Tab, Tabs } from '@material-ui/core'
import React, { useState } from 'react'
import Positions from '../Positions'
import Schedules from '../Schedules'


const useStyles = makeStyles((theme) => ({
  appBar: {
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
  }
}));

const League = () => {
  const classes = useStyles();
  
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {    
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Tabs value={value} variant='fullWidth' onChange={handleChange} aria-label="Detalle del torneo">
          <Tab label="Tabla" />
          <Tab label="Jornadas"/>
        </Tabs>
      </AppBar>
      { value === 0 && <Positions />}
      { value === 1 && <Schedules />}
    </React.Fragment>
  )
}

export default League
