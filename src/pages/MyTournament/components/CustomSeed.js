import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'
import { Seed, SeedItem, SeedTeam } from 'react-brackets';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles( theme => ({ 
  root:{    
    minWidth:'350px'
  }, 
  match : {
    padding: theme.spacing(1),
    cursor:'pointer',
    width:'350px',
    transition: '0.25s',
    backgroundColor:`${theme.palette.background.paper} !important`,
    boxShadow: theme.shadows[2],
    color: '#fff',
    '&:hover': {
      boxShadow: theme.shadows[10],
    }
  },
  seedTeam: {
    color:`${theme.palette.text.primary}`,
    borderLeft:`5px solid ${theme.palette.secondary.main}`,
    padding:'1em !important',
    '&:first-child':{
      borderBottom:`1px solid ${theme.palette.divider}`,
      borderLeft:`5px solid ${theme.palette.primary.main}`
    },
  }
}))

const DetailSeed = ({seed}) => {

  const classes = useStyle();  

  return (
      <div className={classes.root}>
        <SeedTeam className={classes.seedTeam}> 
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Avatar alt={seed.teams[0].pokemonNick} src={seed.teams[0].photoURL} />
            <Typography style={{ paddingLeft:'7px' }}>
              {seed.teams[0]?.pokemonNick || 'En espera'}
            </Typography>            
          </Box> 
          <Box color={ seed.teams[0].score > seed.teams[1].score ? "error.main" : ''}>
            {seed.teams[0]?.score || '-'}
          </Box>          
        </SeedTeam>
        <SeedTeam className={classes.seedTeam}> 
          <Box display='flex' justifyContent='center' alignItems='center'>
            <Avatar alt={seed.teams[1].pokemonNick} src={seed.teams[1].photoURL} />
            <Typography style={{ paddingLeft:'7px' }}>
              {seed.teams[1]?.pokemonNick || 'En espera'}
            </Typography>            
          </Box>         
          <Box color={ seed.teams[1].score > seed.teams[0].score ? "error.main" : ''}>
            {seed.teams[1]?.score || '-'}
          </Box>           
        </SeedTeam>
      </div>
  )
}

const EmptySeed = () => {

  const classes = useStyle();  

  return (
      <div className={classes.root}>
        <SeedTeam className={classes.seedTeam}>           
          <Typography>
            ------------
          </Typography>                     
        </SeedTeam>
        <SeedTeam className={classes.seedTeam}>           
          <Typography>
            ------------
          </Typography>                     
        </SeedTeam>
      </div>
  )
}


const CustomSeed = ({seed, breakpoint, onSelect, roundIndex, seedIndex, type}) => {
  const classes = useStyle();  

  const handleClik = () => {    
    if(Object.keys(seed).length === 0 ) return ;
    if('name' in seed.teams[0] || 'name' in seed.teams[1] || seed.teams[0].score || seed.teams[1].score ) return;
    onSelect(seed, roundIndex, seedIndex, type);
  }

  return (
    <Seed mobileBreakpoint={breakpoint}>
      <SeedItem onClick={handleClik} className={classes.match}>
        { Object.keys(seed).length > 0 ? <DetailSeed seed={seed} /> : <EmptySeed /> }
      </SeedItem>
    </Seed>
  )
}


export default CustomSeed
