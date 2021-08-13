import { Box, ButtonBase, Container, Fade, Grow, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Image from '../components/Image'
import { useHistory } from "react-router-dom";


import first from '../assets/1.png'
import second from '../assets/2.png'
import third from '../assets/3.png'
import fourth from '../assets/4.png'
import fifth from '../assets/5.png'
import sixth from '../assets/6.png'
import {colors} from "../services/colors";
import Partner from "../assets/partner.png";
import useTrainee from '../hooks/useTrainee';
import Welcome from '../components/Welcome';

const sections = [
  {
    name:'Torneos',
    icon: first,
    link: 'torneos',
    admin: false
  },  
  {
    name:'Mis Torneos',
    icon: second,
    link: 'mistorneos',
    admin: false
  },
  {
    name:'Reglas',
    icon: third,
    link: 'reglas',
    admin: false
  },
  {
    name:'Mi Cuenta',
    icon: fourth,
    link: 'perfil',
    admin: false
  },
  {
    name:'Temáticas',
    icon: fifth,
    link: 'tematicas',
    admin: true
  },
  {
    name:'Usuarios',
    icon: sixth,
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
    position:'relative',
    height:145,
    width:145,            
    borderRadius:'10px',
    marginBottom:'1rem',
    boxShadow: theme.shadows[3],    
    display:'flex',
    flexDirection:'column',
    [theme.breakpoints.up('sm')]: {
      height:280,
      width:280,      
    }
  },
  image:{
    width:80,
    [theme.breakpoints.up('sm')]: {      
      width:120,      
    }
  },
  sectionContent: {
    transition:'all 0.2s ease-in-out',
    width:'100%',
    height:'100%',    
    justifyContent:'center',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    '&:hover':{ 
      transform:'scale(1.1)'
    },
  },
  sectionTitle: {
    fontSize:'1.2rem',
    color: theme.palette.common.white,
    [theme.breakpoints.up('sm')]: {      
      fontSize:'2rem',      
    }
  },
}));

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
  const { info : { admin, pokemonID }} = useTrainee();
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
          mb={5}
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
                  style={{ background:`${colors[index]}`}}
                  className={classes.section}                 
                  onClick={ () => history.push(`/${section.link}`) }
                  focusRipple>
                  <div className={classes.sectionContent}>
                    <Image path={section.icon} className={classes.image} />                           
                    <Typography
                      component="span"
                      color="inherit"
                      variant='subtitle1'
                      className={classes.sectionTitle}              
                    >
                      {section.name}              
                    </Typography>                    
                  </div>
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
