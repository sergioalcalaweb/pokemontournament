import { Box, Container, Fade, Paper, Tab, Tabs, Typography, withWidth } from '@material-ui/core'
import React, { useState } from 'react'
import ChampionsText from './components/ChampionsText';
import CupText from './components/CupText';
import LeagueText from './components/LeagueText';
import ObligationsText from './components/ObligationsText';
import SanctionsText from './components/SanctionsText';
import SuscriptionText from './components/SuscriptionText';


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Rules = ({width}) => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Fade in timeout={{appear: 600, enter: 500}}>
      <Container>
        <Box paddingTop={5}>
          <Typography variant="subtitle1">Reglas</Typography>
          <Box component={Paper} display="flex" flexDirection={{xs:'column', md:'row'}}>
            <Tabs 
              value={value} 
              onChange={handleChange}
              aria-label='Lista de torneos'
              style={{ minWidth: width === 'sm' || width === 'xs' ? 'auto' : '150px' }}
              orientation={width === 'sm' || width === 'xs' ? 'horizontal':'vertical'}               
              // variant={width === 'xs' ? 'fullWidth':'scrollable'}
              variant='scrollable'
              >
              <Tab label='Inscripciones' aria-controls='Inscripciones' />
              <Tab label='Liga' aria-controls='Liga' />
              <Tab label='Copa' aria-controls='Copa'/>
              <Tab label='Campeones' aria-controls='Campeon de campeones' />
              <Tab label='Sanciones' aria-controls='Sanciones' />
              <Tab label='Obligaciones' aria-controls='Obligaciones' />
            </Tabs>
            <TabPanel value={value} index={0}>
              <SuscriptionText />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <LeagueText />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <CupText />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <ChampionsText />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <SanctionsText />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <ObligationsText />
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </Fade>
  )
}

export default  withWidth()(Rules)
