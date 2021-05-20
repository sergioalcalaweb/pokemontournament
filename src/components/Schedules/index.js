import { Avatar, Box, Container, Divider, Fade, List, ListItem, ListItemText, ListSubheader, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import _ from 'lodash';
import MatchResult from '../MatchResult';
import useTournament from '../../hooks/useTournament';
import useTrainee from '../../hooks/useTrainee';

const styles = makeStyles( (theme) => ({
  match:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',    
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
      flexDirection:'row',
    }
  },
  subHeader: {
    fontSize:'1.1rem',
    top:'64px'
  },
  home: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    flexGrow:2,
    height:'100px',
    width:'35%',
    [theme.breakpoints.up('sm')]: {
      height:'60px',      
      flexDirection:'row',      
    }
  },
  away: {
    display:'flex',
    flexDirection:'column',    
    flexGrow:2,
    height:'100px',
    width:'35%',
    alignItems:'center',        
    [theme.breakpoints.up('sm')]: {
      height:'60px',      
      justifyContent: 'flex-start',
      flexDirection:'row-reverse',
    }
  },
  versus:{
    width:'30%',
    padding:theme.spacing(2),
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  result:{
    margin:'0 1rem',
    fontSize: '1.8rem',
    [theme.breakpoints.up('sm')]: {
      margin:'0 2rem'
    }
  },
  avatar: {
    textAlign:'center',
    margin:'10px 0',
    [theme.breakpoints.up('sm')]: {
      margin:'0 10px'
    }
  },
  break: {
    textAlign:'center',
    wordBreak:'break-all'
  }
}) )

const Schedules = () => {

  const classes = styles();

  const { id } = useParams();
  const {matchs, updateMatch, participants} = useTournament(id);
  const { info: user } = useTrainee();
  const [open, setOpen] = useState(false);
  const [match, setMatch] = useState(null);

  const shedules = _.groupBy(matchs,'day');
  const days = Object.keys(shedules);  
  const userInfo = (pokemonNick) => participants.find( p => p.pokemonNick === pokemonNick );

  const handleMatchClick = (matchInfo) => {     
    if(!matchInfo.close && (user.admin || (user.pokemonNick === matchInfo.away || user.pokemonNick === matchInfo.home ))) {
      setMatch(matchInfo);
      setOpen(true);
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = async (match) => {    
    setOpen(false);
    await updateMatch(match);
  }

  return (
    <Fade in>
      <Container>
        <Box py={5}>
          {
            days.map( (day, index) => (
              <List component={Paper} square key={index}>
                <ListSubheader className={classes.subHeader} color='primary'>{`Jornada ${day}`}</ListSubheader>
                {shedules[`${day}`].map((match,index) => {
                  const homeUser = userInfo(match.home);
                  const awayUser = userInfo(match.away);

                  return (<React.Fragment key={index}>
                    <ListItem button onClick={ () => handleMatchClick(match) }>
                      <ListItemText primary={
                        <Box className={classes.match}>
                          <Box className={classes.home}>
                            <Avatar className={classes.avatar} src={homeUser.photoURL}></Avatar>
                            <Typography component='p' className={classes.break}>{match.home} </Typography>
                          </Box>
                          <Box className={classes.versus}>
                            { match.close && 
                              <Typography className={classes.result}>{match.homeResult}</Typography>
                            }
                            <Typography>VS</Typography>
                            { match.close &&                           
                              <Typography className={classes.result}>{match.awayResult}</Typography>
                            }
                          </Box>
                          <Box className={classes.away}>
                            <Avatar className={classes.avatar} src={awayUser.photoURL}></Avatar>
                            <Typography component='p' className={classes.break}>{match.away} </Typography>
                          </Box>
                        </Box>
                      }  />
                    </ListItem>
                    <Divider />
                  </React.Fragment>)
                })}
              </List>
            ) )
          }
        </Box>
        { match && (<MatchResult match={match} open={open} onClose={handleClose} onSave={handleSave} />)}
      </Container>
    </Fade>
  )
}

export default Schedules
