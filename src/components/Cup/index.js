import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonBase, Container, Fade, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useTournament from '../../hooks/useTournament';
import _ from 'lodash';
import Trofeo from "../../assets/tournaments/Ticketed_Research_medal.png";
import winner from "../../assets/winner.jpg";
import Image from '../Image';
import MatchCupResult from '../MatchCupResult';
import { withNotification } from '../../HOC/Notification';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Trainee from '../Trainee';
import ShowTopic from '../ShowTopic';
import DetailTopic from '../DetailTopic';
import useTrainee from '../../hooks/useTrainee';


const useStyle = makeStyles( theme => ({
   
  root: {
    overflow:'hidden',         
    background: 'linear-gradient(to top, #c79081 0%, #dfa579 100%)',
    backgroundColor: '#FBAB7E',
    padding:'1rem 0.7rem',
    display:'flex',
    flexWrap: 'nowrap',       
    overflowX: 'auto'
  },
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
  winTitle: {
    fontSize:'1.3rem',     
    fontWeight:'bold',
    color:'#fff' 
  },
  winName: {
    fontSize:'1.5rem',
    fontWeight:'bold',
    textTransform:'uppercase'
  },
  player : {
    display: 'flex',
    flexDirection: 'row',  
    justifyContent:'space-evenly',  
    width:'250px',
    height:'100px',
    padding: theme.spacing(1),
    transition: '0.5s',  
    backgroundImage:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
    boxShadow: theme.shadows[2],
    borderRadius:10,    
    margin:'1rem',
    color: '#fff',
    '&:hover': {
      boxShadow: theme.shadows[10],
    }
  },
}))

const Cup = ({showNotification}) => {
  const { id } = useParams();
  const {detail, games, updateCupMatch, participantsCup, topic, addTopic} = useTournament(id);
  const { info: {admin, pokemonNick} } = useTrainee();
  const [open, setOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);
  const [match, setMatch] = useState(null);
  const [trainee, setTrainee] = useState(null);
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
    if(admin || (pokemonNick === match.homeTeam || pokemonNick === match.awayTeam )) {
      if( match.homeTeam === 'espera' || match.awayTeam === 'espera' ) {
        return;
      } else if(match.homeResult) {
        return;
      }
      setMatch(match);
      setOpen(true);
    }     
  }

  const handlePlayerClick = (trainee) => {        
    setTrainee(trainee);
    setOpenPlayer(true);
  }

  const handleClose = () => {
    setOpen(false);
    setOpenPlayer(false);
    setOpenTopic(false);
  }

  const handleOpentopic = () => setOpenTopic(true);

  const addCupTopic = async (topic) => {
    setOpenTopic(false);
    await addTopic(topic);
  }

  return (
    <Container>
      <Fade in timeout={{appear: 600, enter: 500}}>
        <>
          <Box paddingTop={5} paddingBottom={5}>
            <Typography variant='subtitle1'>{detail.title}</Typography>            
              { detail.finished && (                
                <Box component={Paper} className={classes.winnerSide}>
                  <div className="pyro">
                      <div className="before"></div>
                      <div className="after"></div>
                  </div>  
                  <Typography variant='h3'>!Felicidades!</Typography>
                  <Typography variant='h3'>!Campeón!</Typography>
                  <Box className={classes.trophy}>
                    <Image path={Trofeo} style={{ width:'100%' }} />
                  </Box>                  
                  <Typography variant='h4'>{ detail.winner }</Typography>                    
                </Box>
              ) }              
              { !detail.finished && (
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
                      <Image path={Trofeo} style={{ width:'100%' }} />
                    </Box>
                    { detail.winner && (
                      <Box className={classes.winner}>
                        <Typography className={classes.winTitle}>GANADOR</Typography>
                        <Typography className={classes.winName}>{ detail.winner }</Typography>
                      </Box>
                    ) }
                  </Box>
                </Box>
              )}
            
            { match && (<MatchCupResult match={match} open={open} onClose={handleClose} onSave={handleSave} />)}          
          </Box>
          <Box>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="participantes"
                id="panel1a-header"
              >
                <Typography>Participantes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box display='flex' flexWrap='wrap' justifyContent='center' alignItems='center'>
                  { participantsCup.map( (player, index) => (
                    <ButtonBase key={index} onClick={ () => handlePlayerClick(player) } className={classes.player}>
                      <Avatar alt={player.pokemonNick} src={player.photoURL} />
                      <Box>
                        <Typography>{player.pokemonNick}</Typography>                      
                      </Box>
                    </ButtonBase>
                  )) }
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="participantes"
                id="panel1a-header"
              >
                <Typography>Temática</Typography>
              </AccordionSummary>
              <AccordionDetails style={{ flexDirection:'column', justifyContent:'center' }}>
                {
                  !topic.name && <Typography align='center'>Sin temática</Typography>
                }
                {
                  !topic.name &&admin && <Button onClick={handleOpentopic}>Agregar Temática</Button>
                }
                {
                  topic.name && (
                    <>
                      <Typography align='center' variant='subtitle2'>{topic.name}</Typography>
                      <DetailTopic topic={topic} />
                    </>
                  )
                }
              </AccordionDetails>
            </Accordion>
          </Box>
        </>
      </Fade>
      <ShowTopic  open={openTopic} onClose={handleClose} onSelect={addCupTopic}/>
      { openPlayer && <Trainee trainee={trainee} open={openPlayer} onClose={handleClose} /> }
    </Container>    
  )
}

export default withNotification(Cup)
