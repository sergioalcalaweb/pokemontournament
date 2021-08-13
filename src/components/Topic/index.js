import { AppBar, Avatar, Box, Button, Chip, Container, Dialog, IconButton, makeStyles, Slide, TextField, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'lodash';


const URL = 'https://pokeapi.co/api/v2/pokemon/';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background:'linear-gradient(90deg, rgba(48,158,185,1) 0%, rgba(48,102,152,1) 100%)',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  input: {
    marginBottom:'0.8rem'
  }
}));

const typeOptions = [
  {
    name:'Bicho',
    image:'Bug'
  },
  {
    name:'Siniestro',
    image:'Dark'
  },
  {
    name:'Dragon',
    image:'Dragon'
  },
  {
    name:'Electrico',
    image:'Electric'
  },
  {
    name:'Hada',
    image:'Fairy'
  },
  {
    name:'Volador',
    image:'Flying'
  },
  {
    name:'Luchador',
    image:'Fighting'
  },  
  {
    name:'Fuego',
    image:'Fire'
  },  
  {
    name:'Fantasma',
    image:'Ghost'
  },  
  {
    name:'Planta',
    image:'Grass'
  },  
  {
    name:'Tierra',
    image:'Ground'
  },  
  {
    name:'Hielo',
    image:'Ice'
  },  
  {
    name:'Normal',
    image:'Normal'
  },
  {
    name:'Veneno',
    image:'Poison'
  },
  {
    name:'Psiquico',
    image:'Psychic'
  },
  {
    name:'Roca',
    image:'Rock'
  },
  {
    name:'Acero',
    image:'Steel'
  }, 
  {
    name:'Agua',
    image:'Water'
  },  
]

function Topic({open, onClose, onSave, topicValue}) {

  const classes = useStyles();  
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const [topic, setTopic] = useState({
    name:'',
    description:'',
    topic:'',
    pokes:[],
    types:[]
  });

  useEffect(() => {

    const getPokemon =  _.debounce( async () => {
      setLoading(true);
      const response = await fetch(`${URL}${inputValue.trim().toLowerCase()}`);
      const pokemonInfo = await response.json();  
         
      const pokemon = [{
        id: pokemonInfo.id,
        name: pokemonInfo.name,
        nameOption: `${pokemonInfo.id} - ${pokemonInfo.name}`,
        type:pokemonInfo.types[0].type.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`
      }];    
      
      const extraInfo = await Promise.all([
        fetch(`${URL}${pokemonInfo.name}-galar`).then( response => response.json() ).catch( _ => {} ),
        fetch(`${URL}${pokemonInfo.name}-alola`).then( response => response.json() ).catch( _ => {} )
      ])

      const galarInfo = extraInfo[0];
      const alolaInfo = extraInfo[1];
      
      if(galarInfo) {
        pokemon.push({
          id: galarInfo.id,
          name: galarInfo.name,
          nameOption: `${galarInfo.id} - ${galarInfo.name}`,
          type:galarInfo.types[0].type.name,
          image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${galarInfo.id}.png`
        })
      }

      if(alolaInfo) {
        pokemon.push({
          id: alolaInfo.id,
          name: alolaInfo.name,
          nameOption: `${alolaInfo.id} - ${alolaInfo.name}`,
          type:alolaInfo.types[0].type.name,
          image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${alolaInfo.id}.png`
        })
      }

      setPokemons(pokemon);
      setLoading(false);
    }, 100);

    if (inputValue === '') {
      setPokemons([]);
      return undefined;
    }
    getPokemon();
    
  }, [inputValue])

  useEffect(() => {
    setTopic(topicValue !== null ? topicValue : {
      name:'',
      description:'',
      code:'',
      pokes:[],
      types:[]
    })   
  }, [topicValue])

  const reset = () => {
    setTopic({
      name:'',
      description:'',
      code:'',
      pokes:[],
      types:[]
    });
  }

  const handleClose = () => {
    onClose();
    reset();
  }

  const handleSave = (topic) => {
    onSave(topic)
    reset();
  }

  return (
    <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Temática
            </Typography>
            <Button 
              autoFocus 
              color="inherit" 
              disabled={ !topic.name && topic.types.length === 0 }
              onClick={ () => handleSave(topic) }>
              { topic.id ? 'Actualizar' : 'Guardar'}
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth='md'>
          <Box padding={3}>
            <TextField 
              label='Nombre'   
              className={classes.input}                             
              name='name'
              variant='outlined'
              fullWidth           
              value={topic.name}
              onChange={ (e) => setTopic({...topic, [e.target.name]:e.target.value}) }   
            />
            <Autocomplete
              multiple
              options={typeOptions}
              fullWidth
              className={classes.input}    
              value={topic.types}
              getOptionSelected={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              onChange={(event, newValue) => {              
                setTopic({...topic, types:newValue});
              }}            
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.name}
                    avatar={<Avatar alt={option.name} src={`../types/${option.image}.png`}/>}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Tipos permitidos" variant="outlined" placeholder="Selecciona los tipos para la tematica" />
              )}
            />

            <Autocomplete
              multiple
              noOptionsText='Ningun pokemon que mostrar'
              id="pokemon-tags-demo"
              options={pokemons}
              fullWidth
              value={topic.pokes}
              name='pokes'
              loadingText='Buscando pokémon...'
              className={classes.input}                
              getOptionLabel={(option) => option.nameOption}
              getOptionSelected={(option, value) => option.name === value.name}
              onChange={(event, newValue) => {                                    
                setTopic({...topic, pokes:newValue});
              }} 
              loading={loading}     
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}      
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.name}
                    avatar={<Avatar alt={option.name} src={option.image}/>}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params}  label="Pokemon baneados" variant="outlined" placeholder="Escribe el numero del pokemon o el nombre" />
              )}
            />
            <TextField
              label='Más información'
              multiline
              name='description'
              rows={4}
              className={classes.input}                             
              fullWidth
              value={topic.description}
              variant="outlined"
              onChange={ (e) => setTopic({...topic, [e.target.name]:e.target.value}) }   
            />
   
            <TextField 
              label='Codigo para Pokemon GO'                 
              name='code'
              variant='outlined'
              fullWidth           
              value={topic.code}
              onChange={ (e) => setTopic({...topic, [e.target.name]:e.target.value}) }   
            />
          </Box>
        </Container>
        
      </Dialog>
  )
}

export default Topic
