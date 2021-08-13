import { Avatar, Box, Checkbox, Container, Fab, Fade, FormControlLabel, makeStyles, Paper, Slide, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { withNotification } from '../../HOC/Notification';
import useTournament from '../../hooks/useTournament';
import useTournaments from '../../hooks/useTournaments';
import useTrainee from '../../hooks/useTrainee';
import Trainee from '../Trainee';

const useStyle = makeStyles( theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  avatar: {
    cursor:'pointer',
    transition:'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow:theme.shadows[4]
    }
  }
}))

const Positions = ({showNotification}) => {
  const classes = useStyle();
  const { id } = useParams();
  const { createCupFromLeague } = useTournaments();
  const { participants, detail, matchs, finish } = useTournament(id);
  const { info: {admin} } = useTrainee();
  const [ loading, setLoading ] = useState(false);
  const [ selectTrainees, setSelectTrainees ] = useState(false);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);
  const [trainee, setTrainee] = useState(null);

  const userInfo = (pokemonNick) => participants.find( p => p.pokemonNick === pokemonNick );

  const getDiff = (participant) => {
    const lose = getLose(participant);
    return participant.win - lose;

  }

  const getLose = (participant) => {
    const totalWin = (detail.participantsCount - 1) * 4;    
    return totalWin - participant.win;
  }

  const handleTraineeClick = (trainee) => {
    setOpen(true);
    setTrainee(trainee);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setSelectTrainees(event.target.checked);
    if(!event.target.checked) {
      setSelected([]);
    }
  };

  const handleClick = (event, trainee) => {
    if ( !selectTrainees ) return ;
    
    const selectedIndex = selected.indexOf(trainee);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, trainee);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleCreate = async () => {
    setLoading(true);
    const players = participants.filter( p => selected.includes(p.pokemonNick) );    
    await createCupFromLeague(players, detail.title);
    await finish();
    showNotification('Torneo creado y listo para empezar');
    setSelected([]);
    setSelectTrainees(false);
    setLoading(false);
  }

  const isSelected = (trainee) => selected.indexOf(trainee) !== -1;

  const isFinish = matchs.filter( m => m.close ).length === matchs.length ? true : false;

  return (
    <Fade in>
      <Container>
        <Box py={3}>
          {
            isFinish && admin && !detail.finished && (
              <Box marginBottom={2} p={2} display='flex'>
                <FormControlLabel
                  control={<Switch checked={selectTrainees} onChange={handleChange} name="checkedA" />}
                  label="Elegir jugadores para liguilla"
                />
              </Box>
            )
          }
          <TableContainer component={Paper}>
            <Table stickyHeader arial-label='Tabla de posiciones'>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align='left'>Jugador</TableCell>
                  <TableCell align='center'>PCT</TableCell>
                  <TableCell align='center'>Ganados</TableCell>              
                  <TableCell align='center'>Perdidos</TableCell>              
                  <TableCell align='center'>Dif.</TableCell>              
                  <TableCell align='center'>Puntos</TableCell>              
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  participants.map( (player, index) => {

                    const isItemSelected = isSelected(player.pokemonNick);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow 
                        hover={selectTrainees} 
                        role="checkbox" 
                        onClick={(event) => handleClick(event, player.pokemonNick)}
                        selected={isItemSelected}
                        key={index}>
                        <TableCell>
                          { !selectTrainees &&  <>{index + 1}</>}
                          { selectTrainees && (
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          ) }
                        </TableCell>
                        <TableCell align='left'>
                          <Box display='flex' alignItems='center'>
                            <Tooltip title="Ver datos de entrenador">
                              <Avatar className={classes.avatar} onClick={ () => handleTraineeClick(player) } src={userInfo(player.pokemonNick).photoURL}></Avatar>
                            </Tooltip>
                            <span style={{ marginLeft:'0.5rem' }}>{player.pokemonNick}</span>
                          </Box>
                        </TableCell>
                        <TableCell align='center'>{player.pct ? player.pct : 0}</TableCell>
                        <TableCell align='center'>{player.win}</TableCell>
                        <TableCell align='center'>{getLose(player)}</TableCell>
                        <TableCell align='center'>{getDiff(player)}</TableCell>
                        <TableCell align='center'>{player.points}</TableCell>
                      </TableRow>
                    )
                   } )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {
          admin && (
            <Slide in={selected.length > 0} direction='up' timeout={400} mountOnEnter unmountOnExit>
              <div className={classes.fab} >
                <Fab
                  onClick={handleCreate} 
                  disabled={loading}          
                  color='secondary'
                  variant='extended'
                  aria-label='Crear Liguilla'>
                  <AddIcon />
                  {loading ? 'Creando...':'Crear Liguilla'}
                </Fab>
              </div>
            </Slide>
          )
        }
        { trainee && (<Trainee trainee={trainee} open={open} onClose={handleClose} />)}
      </Container>
    </Fade>
  )
}

export default  withNotification(Positions);
