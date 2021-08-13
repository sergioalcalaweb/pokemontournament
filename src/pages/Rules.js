import { Box, Container, Divider, Fade, Paper, Tab, Tabs, Typography, withWidth } from '@material-ui/core'
import React, { useState } from 'react'

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
              orientation={width === 'xs' ? 'horizontal':'vertical'}               
              variant={width === 'xs' ? 'fullWidth':'scrollable'}>
              <Tab label='Trainee' aria-controls='Reglas de liga trainee' />
              <Tab label='Elite' aria-controls='Reglas de liga elite' />
              <Tab label='Copa' aria-controls='Reglas de copa'/>
            </Tabs>
            <TabPanel value={value} index={0}>
              <Typography variant='subtitle1'> Reglas de la liga trainee </Typography>
              <Divider></Divider>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography variant='subtitle1'> Reglas de la liga elite </Typography>
              <Divider></Divider>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Typography variant='subtitle1'> Reglas de la copa </Typography>
              <Divider></Divider>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </Fade>
  )
}

export default  withWidth()(Rules)
