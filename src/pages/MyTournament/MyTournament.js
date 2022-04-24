import React from 'react'
import { useParams } from 'react-router-dom';
import Cup from './components/Cup';
import League from './components/League';
import useTournament from '../../hooks/useTournament';


const MyTournament = () => {

  const { id } = useParams();
  const tournament = useTournament(id);

  return (
    <React.Fragment>      
      { tournament.detail.kind === 'liga' && <League tournament={tournament} /> }
      { tournament.detail.kind === 'copa' && <Cup tournament={tournament} /> }
    </React.Fragment>
    
  )
}

export default MyTournament;
