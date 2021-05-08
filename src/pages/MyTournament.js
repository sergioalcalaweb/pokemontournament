import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Cup from '../components/Cup';
import League from '../components/League';
import useTournament from '../hooks/useTournament';


const MyTournament = () => {

  const { id } = useParams();
  const { detail } = useTournament(id);

  return (
    <React.Fragment>      
      { detail.kind === 'liga' && <League /> }
      { detail.kind === 'copa' && <Cup /> }
    </React.Fragment>
    
  )
}

export default MyTournament;
