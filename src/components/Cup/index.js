import { Box, ButtonBase, Container, Fade, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useTournament from '../../hooks/useTournament';
import _ from 'lodash';
import Trofeo from "../../assets/trofeo.png";
import Image from '../Image';
import MatchCupResult from '../MatchCupResult';
import { withNotification } from '../../HOC/Notification';

const useStyle = makeStyles( theme => ({
  root: {
    overflow:'hidden',
    background:'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
    backgroundColor: '#FBAB7E',
    padding:'1rem 0.7rem',
    display:'flex',
    flexWrap: 'nowrap',       
    overflowX: 'auto'
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
    background:'#fff',
    width:'150px',
    height:'150px',
    borderRadius:'50%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    boxShadow: theme.shadows[3],
  },
  winner: {
    marginTop:'1rem',
    textShadow: '0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)',
    color:'#fff'
  },
  winTitle: {
    fontSize:'1.3rem',     
    fontWeight:'bold'   
  },
  winName: {
    fontSize:'1.5rem',
    fontWeight:'bold',
    textTransform:'uppercase'
  }
}))

const Cup = ({showNotification}) => {
  const { id } = useParams();
  const {detail, games, updateCupMatch} = useTournament(id);
  const [open, setOpen] = useState(false);
  const [match, setMatch] = useState(null);
  const classes = useStyle();

  const tournamentGames = _.groupBy(games,'round');
  const days = Object.keys(tournamentGames);
  
  const missings = () => {    
    const lastDay = days.length;
    const currentGames = tournamentGames[lastDay].length;            
    if(currentGames === 1) {
      return [];
    }
    const missings = currentGames / 2;
    const arrMissings =  Array.from({length: missings}, (v, i) => i);        
    const daysMissing = [];
    for (let index = arrMissings.length; index > 0; index--) {
      const tempGame = Array.from({length: index}, (v, i) => i);      
      daysMissing.push(tempGame);
    }
    return daysMissing;
  }  

  const handleSave = async (match) => {
    await updateCupMatch(match);
    setOpen(false);
    showNotification('Listo copa actualizada');
  }

  const handleClick = (match) => {        
    if( match.homeTeam === 'espera' || match.awayTeam === 'espera' ) {
      return;
    } else if(match.homeResult) {
      return;
    }
    setMatch(match);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Fade in timeout={{appear: 600, enter: 500}}>
        <Box paddingTop={5} paddingBottom={5}>
          <Typography variant='subtitle1'>{detail.title}</Typography>
          <Box component={Paper} className={classes.root}>
              {
                days.map( day => (
                  <Box key={day} className={classes.games}>
                    {tournamentGames[`${day}`].map( (match, index) => (
                      <Box component={ButtonBase} onClick={ () => handleClick(match) } key={index} className={classes.match}>
                        <Typography>{match.homeTeam}</Typography>
                        <Typography>VS</Typography>
                        <Typography>{match.awayTeam}</Typography>
                      </Box>
                    ))}
                  </Box>
                ))
              }
              {
                missings().map( day => (
                  <Box key={day} className={classes.games}>          
                    { day.map( match => (
                      <Box component={ButtonBase} key={match}  className={classes.match}>              
                        <Typography>Por Definir</Typography>              
                      </Box>
                    ) ) }
                  </Box>
                ) )
              }
              <Box display='flex' flexDirection='column' textAlign='center' justifyContent='center' ml={2} pr={2}>
                <Box className={classes.trophy}>
                  <Image path={Trofeo} style={{ width:'100px' }} />
                </Box>
                { detail.winner && (
                  <Box className={classes.winner}>
                    <Typography className={classes.winTitle}>GANADOR</Typography>
                    <Typography className={classes.winName}>{ detail.winner }</Typography>
                  </Box>
                ) }
              </Box>
          </Box>
          { match && (<MatchCupResult match={match} open={open} onClose={handleClose} onSave={handleSave} />)}
        </Box>
      </Fade>
    </Container>
  )
}

export default withNotification(Cup)
