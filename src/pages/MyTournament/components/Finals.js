import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Fade, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { Bracket } from 'react-brackets';
import Winner from '../../../components/Winner';
import MatchCupResult from './MatchCupResult';
import Trofeo from "../../../assets/tournaments/Ticketed_Research_medal.png";
import Image from '../../../components/Image';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DetailTopic from '../../../shared/DetailTopic';
import ShowTopic from './ShowTopic';
import { withNotification } from '../../../HOC/Notification';
import CustomSeed from './CustomSeed';


const CustomTitle = (title) => {
  return (
    <Typography align='center'>{title}</Typography>
  )
}


const Finals = ({detail, repechages, finals, updateFinalMatch, admin, topic, addTopic, openRound, showNotification, trainee}) => {
  const [match, setMatch] = useState();
  const [open, setOpen] = useState(false);
  const [openTopic, setOpenTopic] = useState(false);

  const rounds = ['Cuartos','Semifinales', 'Final'];

  const setresult = (seed, ridx, sidx, type) => {    
    if(type === 'finals' && ridx === detail.round) {
      showNotification('Aun no puedes dar el resultado', 'info');
      return;
    } else if( !admin && seed.teams[0].pokemonNick !== trainee && seed.teams[0].pokemonNick !== trainee){
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

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = async (info) => {    
    setOpen(false);
    await updateFinalMatch(info);
  }

  const handleOpentopic = () => setOpenTopic(true);

  const addCupTopic = async (topic) => {
    setOpenTopic(false);
    await addTopic(topic);
  }

  const handleClick = async () => {
    await openRound(detail.round);
    showNotification('Juegos habilitiados');
  }

  return (
    <Fade in>
      <Container>
        {
          detail.repechage && (
            <Box mt={5} pt={3} overflow='auto'>
              <Bracket key={0}                 
                rounds={repechages} 
                mobileBreakpoint={0}
                renderSeedComponent={(props) => {
                  return <CustomSeed {...props} type='repechage' onSelect={setresult} />
                }} 
                roundTitleComponent={CustomTitle} /> 
            </Box>
          )
        }
        {  !detail.repechage && !detail.finished && (
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
        ) }
        { admin && !detail.repechage && !detail.finished && detail.round < 3 && (
          <Box mt={1}>
            <Button variant="contained" color="primary" onClick={handleClick} >Iniciar {rounds[detail.round]}</Button>
          </Box>
        ) }
        { detail.finals && !detail.finished && (
          <Box>
            <Box mt={2} overflow='auto'>            
              <Bracket key={1}               
                rounds={finals} 
                mobileBreakpoint={0}
                renderSeedComponent={(props) => {
                  return <CustomSeed {...props} type='finals' onSelect={setresult} />
                }} 
                roundTitleComponent={CustomTitle} /> 
              
            </Box>
            <Box mt={3} mb={5} width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
              <Image path={Trofeo} style={{ width:'120px', height:'120px' }} />
            </Box>
          </Box>
        ) }
        { detail.finished && (
          <Box mt={5}>
            <Winner winner={detail.winner} />
          </Box>
        ) }
        <ShowTopic  open={openTopic} onClose={handleClose} onSelect={addCupTopic}/>
        { match && (<MatchCupResult match={match} open={open} onClose={handleClose} onSave={handleSave} />)}          
      </Container>
    </Fade>
  )
}

export default withNotification(Finals)
