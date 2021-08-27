import React from 'react'
import { useParams } from 'react-router-dom';
import Cup from './components/Cup';
import League from './components/League';
import useTournament from '../../hooks/useTournament';


const MyTournament = () => {

  const { id } = useParams();
  const { detail } = useTournament(id);

  return (
    <React.Fragment>      
      { detail.kind === 'liga' && <League id={id} /> }
      { detail.kind === 'copa' && <Cup id={id} /> }
    </React.Fragment>
    
  )
}

export default MyTournament;
