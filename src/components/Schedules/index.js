import { Avatar, Box, Button, Container, Divider, Fade, IconButton, List, ListItem, ListItemText, ListSubheader, makeStyles, Paper, Tooltip, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import _ from 'lodash';
import MatchResult from '../MatchResult';
import useTournament from '../../hooks/useTournament';
import useTrainee from '../../hooks/useTrainee';
import GavelIcon from '@material-ui/icons/Gavel';
import AddIcon from '@material-ui/icons/Add';
import ShowTopic from '../ShowTopic';
import { withNotification } from '../../HOC/Notification';
import useTopics from '../../hooks/useTopics';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EventBusyIcon from '@material-ui/icons/EventBusy';

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

const Schedules = ({showNotification}) => {

  const classes = styles();

  const { id } = useParams();
  const {matchs, updateMatch, participants, rules, addRule, detail:{finished, day: gameDay}, updateDay} = useTournament(id);
  const { getDetail } = useTopics();
  const { info: user } = useTrainee();
  const [open, setOpen] = useState(false);
  const [openRule, setOpenRule] = useState(false);
  const [match, setMatch] = useState(null);
  const [day, setDay] = useState(null);
  const [topic, setTopic] = useState(null);
  

  const shedules = _.groupBy(matchs,'day');
  const days = Object.keys(shedules);  
  const userInfo = (pokemonNick) => participants.find( p => p.pokemonNick === pokemonNick );
  const getRule = (day) => rules.find( r => r.day === day );

  const handleMatchClick = (matchInfo) => {     
    if(!matchInfo.close && (user.admin || (user.pokemonNick === matchInfo.away || user.pokemonNick === matchInfo.home ))) {
      setMatch(matchInfo);
      setOpen(true);
    }
  }

  const handleClose = () => {
    setTopic(null);
    setOpen(false);
    setOpenRule(false);
  }

  const handleSave = async (match) => {    
    setOpen(false);
    await updateMatch(match);
  }

  const handleAddRule = (day) => {
    setOpenRule(true);
    setDay(day);
  }

  const addRuleDay = async (topic) => {    
    setOpenRule(false);
    await addRule(topic.id,day);
  }

  const showRule = async ({topicID}) => {
    const detail = await getDetail(topicID);
    setTopic(detail);
    setOpenRule(true);
  }

  const handleDayUpdate = async (day, status) => {
    await updateDay(day, status);
    showNotification(`Jornada ${status ? 'disponible' :'bloqueada' } para todos`);
  }

  return (
    <Fade in>
      <Container>
        <Box py={5}>
          {
            days.map( (day, index) => {

              const matchs = shedules[`${day}`];
              const available = day <= gameDay;
        
              return (
                <List component={Paper} square key={index}>
                  <ListSubheader className={classes.subHeader} color='primary'>
                    <Box display='flex' flexDirection='row' justifyContent='space-between'>
                      <div>{`Jornada ${day}`}</div>
                      <div>
                        { getRule(day) && !finished &&
                          <Button size="small" 
                            variant="outlined" 
                            onClick={ () => showRule(getRule(day)) }
                            startIcon={ <GavelIcon fontSize="inherit" /> }>
                            Ver regla
                          </Button>
                        }
                        { user.admin && !getRule(day) && !available && !finished &&
                          <Button size="small" variant="outlined" onClick={ () => handleAddRule(day) } startIcon={ <AddIcon /> }>
                            Agregar regla
                          </Button>
                        }
                        { user.admin && !available && (gameDay + 1 !== Number(day)) && !finished &&
                          <Tooltip title="En esepera de habitiar jornada anterior">
                            <IconButton aria-label="bloqueado">
                              <EventBusyIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        { user.admin && available && (gameDay + 1 === Number(day)) && !finished &&
                          <Tooltip title="bloquear">
                            <IconButton onClick={ () => handleDayUpdate(day, false) } aria-label="bloquear">
                              <LockOpenIcon />
                            </IconButton>
                          </Tooltip>
                        }
                        { user.admin && !available && (gameDay + 1 === Number(day)) &&
                          <Tooltip title="desbloquesar">
                            <IconButton onClick={ () => handleDayUpdate(day, true) } aria-label="desbloquear">
                              <LockIcon />
                            </IconButton>
                          </Tooltip>
                        } 
                      </div>
                    </Box>
                  </ListSubheader>
                  { !available && !user.admin && (
                    <ListItem>
                        <ListItemText primary="No disponible" />
                    </ListItem>
                  ) }
                  { (available  || (!available && user.admin)) &&                  
                    matchs.map((match,index) => {
                      const homeUser = userInfo(match.home);
                      const awayUser = userInfo(match.away);
                      return (
                        <React.Fragment key={index}>
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
                        </React.Fragment>
                      )
                    })
                  }
                </List>
              )
             } )
          }
        </Box>
        <ShowTopic topicDetail={topic} open={openRule} onClose={handleClose} onSelect={addRuleDay}/>
        { match && (<MatchResult match={match} open={open} onClose={handleClose} onSave={handleSave} />)}        
      </Container>
    </Fade>
  )
}

export default withNotification(Schedules)
