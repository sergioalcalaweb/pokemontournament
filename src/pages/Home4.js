import { Box, ButtonBase, Container, Fade, Grow, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Image from '../components/Image'
import { useHistory } from "react-router-dom";

import Pokeball from '../assets/pokeball.png'
import {colors2} from "../services/colors";
import Partner from "../assets/partner.png";
import useTrainee from '../hooks/useTrainee';
import Welcome from '../components/Welcome';

const sections = [
  {
    name:'Torneos',
    link: 'torneos',
    admin: false
  },  
  {
    name:'Mis Torneos',
    link: 'mistorneos',
    admin: false
  },
  {
    name:'Mi Cuenta',
    link: 'perfil',
    admin: false
  },
  {
    name:'Reglas',
    link: 'reglas',
    admin: false
  },
  {
    name:'Temáticas',
    link: 'tematicas',
    admin: true
  },
  {
    name:'Usuarios',
    link: 'usuarios',
    admin: true
  }
];

const useStyles = makeStyles( (theme) => ({
  toolbar: {
    display:'flex',
    justifyContent:'space-between'
  },
  section: {
    transition:'all 0.2s ease-in-out',
    position:'relative',
    height:90,
    width:350,    
    overflow:'hidden',
    borderRadius:'55px',
    marginBottom:'1rem',
    boxShadow: theme.shadows[5],
    '&:hover':{ 
      boxShadow: theme.shadows[10],
    },
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize:'2rem',
    paddingLeft:30,
    color: theme.palette.common.white,
  },
}));

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
  const { info : { admin, pokemonID }} = useTrainee()
  let filteredSections;

  if( !admin  ) {
    filteredSections = sections.filter( section => !section.admin )
  } else {
    filteredSections = sections;
  }
  
  return (
    <Container>
      {!pokemonID && <Welcome />}
      <Box textAlign="center" paddingTop={5}>
        <Fade in timeout={500}>
          <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">         
            <Typography variant='subtitle1'>Bienvenido</Typography>
            <Image path={Partner} style={{ width:'100px' }} />
          </Box>
        </Fade>
        <Box
          mt={5}
          display="flex"
          flexWrap="wrap"
          justifyContent="space-around"
          alignItems="center"
          width="100%"
        >
          {filteredSections.map( (section, index) => (
            <Grow in timeout={ index * 500 } key={index}>
              <div>
                <ButtonBase 
                  style={{ backgroundColor:`${colors2[index]}`}}
                  className={classes.section}                 
                  onClick={ () => history.push(`/${section.link}`) }
                  focusRipple>                     
                      <div className={classes.sectionTitle}>
                        <Typography
                          component="span"
                          color="inherit"
                          variant='subtitle1'              
                        >
                          {section.name}              
                        </Typography>
                      </div>
                      <Image path={Pokeball} style={{ width:'100px', position:'relative', right:'-1px' }} />
        
                </ButtonBase>
              </div>
            </Grow>
          ) )}
        </Box>
      </Box>
    </Container>
  )
}

export default Home