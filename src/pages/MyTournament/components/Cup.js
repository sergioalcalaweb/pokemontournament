import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, ButtonBase, Container, Fade, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import useTournament from '../../../hooks/useTournament';
import Trofeo from "../../../assets/tournaments/Ticketed_Research_medal.png";
import winner from "../../../assets/winner.jpg";
import Image from '../../../components/Image';
import { withNotification } from '../../../HOC/Notification';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useTrainee from '../../../hooks/useTrainee';
import DetailTopic from '../../../shared/DetailTopic';
import ShowTopic from './ShowTopic';
import Trainee from './Trainee';
import MatchCupResult from './MatchCupResult';
import { Bracket } from 'react-brackets';
import CustomSeed from './CustomSeed';
import Winner from '../../../components/Winner';


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

const Cup = ({showNotification, id}) => {
  
  const {detail, games, updateCupMatch, participantsCup, topic, addTopic} = useTournament(id);
  const { info: {admin, pokemonNick} } = useTrainee();
  const [open, setOpen] = useState(false);
  const [openPlayer, setOpenPlayer] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);
  const [match, setMatch] = useState(null);
  const [trainee, setTrainee] = useState(null);
  const classes = useStyle();


  const handleSave = async (match) => {
    setOpen(false);
    await updateCupMatch(match);
    showNotification('Listo copa actualizada');
  }


  const handleClick = (seed, ridx, sidx, type) => {     
    if( !admin && seed.teams[0].pokemonNick !== pokemonNick && seed.teams[1].pokemonNick !== pokemonNick){
      return;
    }

    const localMatch = {
      homeTeam:seed.teams[0].pokemonNick,
      awayTeam:seed.teams[1].pokemonNick,
      roundIndex:ridx,
      setIndex:sidx,
      type
    };
    setMatch(localMatch);
    setOpen(true);
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
          { !detail.finished && (
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
                  aria-controls="tematicas"
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

          ) }
          <Box mt={2} overflow='auto'>
            { detail.finished 
              ?  <Winner winner={detail.winner} />
              : (                
                <Bracket              
                    rounds={games} 
                    mobileBreakpoint={0}
                    renderSeedComponent={(props) => {
                      return <CustomSeed {...props} type='games' onSelect={handleClick} />
                    }} 
                    roundTitleComponent={(title, roundIndex) => {
                      if(roundIndex === 0) {
                        return (
                          <Typography variant='subtitle1' align='left'>{detail.title}</Typography>
                        )
                      } else {
                        return null;
                      }
                    }} />                
              )
            }
          </Box> 
          { !detail.finished && ( 
            <Box mt={3} mb={5} width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Image path={Trofeo} style={{ width:'120px', height:'120px' }} />
            </Box>      
          )}   
        </>
      </Fade>
      { match && (<MatchCupResult match={match} open={open} onClose={handleClose} onSave={handleSave} />)}     
      <ShowTopic  open={openTopic} onClose={handleClose} onSelect={addCupTopic}/>
      { openPlayer && <Trainee trainee={trainee} open={openPlayer} onClose={handleClose} /> }
    </Container>    
  )
}

export default withNotification(Cup)
