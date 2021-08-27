import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import React from 'react'
import Image from './Image'
import Trofeo from "../assets/tournaments/Ticketed_Research_medal.png";
import winner from "../assets/winner.jpg";

const useStyle = makeStyles( theme => ({
   
  winnerSide: {       
    background:`url(${winner}) no-repeat`, 
    backgroundSize:'100% 100%',   
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    textShadow: '0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)',
    color:'#fff',
    padding:'3rem 1rem',
    textTransform:'uppercase'
  },  
  games: {
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-evenly',
    alignItems:'center',
    width:'250px',
    marginRight:'1rem',
    flex:'0 0 auto'
  },
  match : {
    display: 'flex',
    flexDirection: 'column',    
    width:'100%',
    padding: theme.spacing(1),
    transition: '0.5s',
    backgroundImage:'linear-gradient(to right, #606c88 0%, #3f4c6b  51%, #606c88  100%)',
    boxShadow: theme.shadows[2],
    borderRadius:10,
    backgroundSize: '200% auto',
    margin:'1rem 0',
    color: '#fff',
    '&:first-child':{
      marginTop:0
    },
    '&:last-child':{
      marginBottom:0
    },
    '&:hover': {
      backgroundPosition:'right center',
      boxShadow: theme.shadows[10],
    }
  },
  trophy : {
    width:'150px',
    height:'150px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  winner: {
    marginTop:'1rem',
    textShadow: '0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)',
    color:'#fff'
  },
  winName: {
    borderBottom:'2px solid white'
  },
}))

const Winner = ({winner}) => {
 const classes = useStyle();
 

  return (
    <Box component={Paper} position='relative' overflow='hidden' margin='0 auto' maxWidth={900} className={classes.winnerSide}>
      <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
      </div>  
      <Typography variant='h3'>!Felicidades!</Typography>
      <Typography variant='h3'>!Campeón!</Typography>
      <Box className={classes.trophy}>
        <Image path={Trofeo} style={{ width:'100%' }} />                  
      </Box>   
      <br />   
      <Typography variant='h4' className={classes.winName}>{ winner.pokemonNick }</Typography>                    
    </Box>
  )
}

export default Winner
