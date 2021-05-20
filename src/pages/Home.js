import { Box, ButtonBase, Container, Fade, Grow, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Image from '../components/Image'
import { useHistory } from "react-router-dom";

import Pokeball from '../assets/pokeball.webp'
import colors from "../services/colors";
import Partner from "../assets/partner.png";
import useTrainee from '../hooks/useTrainee';

const sections = [
  {
    name:'Torneos Pokemon',
    link: 'torneos',
    admin: false
  },
  {
    name:'Mis Torneos',
    link: 'mistorneos',
    admin: false
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
    height:150,
    width:350,    
    overflow:'hidden',
    borderRadius:'15px',
    marginBottom:'1rem',
    boxShadow: theme.shadows[2],
    '&:hover':{ 
      boxShadow: theme.shadows[10],
    }
  },
  image: {
    position:'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,    
    zIndex:0,
    opacity:0.5
  },
  sectionTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize:'2rem',
    paddingLeft:10,
    color: theme.palette.common.white,
  },
}));

const Home = () => {
  const classes = useStyles();
  let history = useHistory();
  const { info : { admin }} = useTrainee()
  let filteredSections;

  if( !admin  ) {
    filteredSections = sections.filter( section => !section.admin )
  } else {
    filteredSections = sections;
  }
  
  return (
    <Container>
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
                  style={{ backgroundColor:`${colors[index]}`}}
                  className={classes.section}                 
                  onClick={ () => history.push(`/${section.link}`) }
                  focusRipple>
                  <div className={classes.image}>
                    <Image path={Pokeball} style={{ width:'200px', position:'relative', right:'-130px', bottom:'-10px' }} />
                  </div>          
                  <div className={classes.sectionTitle}>
                    <Typography
                      component="span"
                      color="inherit"
                      variant='subtitle2'              
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
