import { Avatar, Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react'
import { useParams } from 'react-router-dom';
import useTournament from '../../hooks/useTournament';

const Positions = () => {
  const { id } = useParams();
  const {participants, detail} = useTournament(id);

  const userInfo = (pokemonNick) => participants.find( p => p.pokemonNick === pokemonNick );

  const getDiff = (participant) => {
    const lose = getLose(participant);
    return participant.win - lose;

  }

  const getPCT = (participant) => {
    const lose = getLose(participant);
    return participant.win / (participant.win + lose);

  }

  const getLose = (participant) => {
    const totalWin = (detail.participantsCount - 1) * 4;    
    return totalWin - participant.win;
  }

  return (
    <Container style={{ marginTop: '2rem' }}>
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
                participants.map( (player, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align='left'>
                      <Box display='flex' alignItems='center'>
                        <Avatar src={userInfo(player.pokemonNick).photoURL}></Avatar>
                        <span style={{ marginLeft:'0.5rem' }}>{player.pokemonNick}</span>
                      </Box>
                    </TableCell>
                    <TableCell align='center'>{getPCT(player)}</TableCell>
                    <TableCell align='center'>{player.win}</TableCell>
                    <TableCell align='center'>{getLose(player)}</TableCell>
                    <TableCell align='center'>{getDiff(player)}</TableCell>
                    <TableCell align='center'>{player.points}</TableCell>
                  </TableRow>
                ) )
              }
            </TableBody>
          </Table>
        </TableContainer>
    </Container>
  )
}

export default Positions;
