import { useFirestore, useFirestoreCollectionData, useFirestoreDocData } from "reactfire";
import generator from 'tournament-generator';

const useTournament = (id) => {

  const firestore = useFirestore();
  
  const tournamentRef = firestore
    .collection('tournaments')
    .doc(id)   
    
  const { data: detail } =  useFirestoreDocData(tournamentRef);
  
  const { data: participants } =  useFirestoreCollectionData(
                                    tournamentRef
                                    .collection('participants')
                                    .orderBy('points', 'desc')
                                    .orderBy('pct', 'desc'), 
                                    { idField: "id" }
                                  );
  const { data: matchs } =  useFirestoreCollectionData(
                              tournamentRef
                              .collection('matchs')
                              .orderBy('day', 'asc'), 
                              { idField: "id" }
                            );
  const { data: games } =  useFirestoreCollectionData(
                              tournamentRef
                              .collection('games')
                              .orderBy('round', 'asc'), 
                              { idField: "id" }
                            );                            
  
  const updateMatch = async (match) => {
    const {awayResult, homeResult, id, home, away} = match;
    const matchRef = tournamentRef.collection('matchs').doc(id);
    await matchRef.update({
      awayResult,
      homeResult,
      close: true,
      updatedAt: new Date()
    })
    
    const homeDoc = await tournamentRef
                          .collection('participants')
                          .where('pokemonNick', '==', home)
                          .limit(1)
                          .get();
    const homeFB = homeDoc.docs[0];
    const homePoints = homeFB.data().points;
    const homeWin = homeFB.data().win;

    const awayDoc = await tournamentRef
                          .collection('participants')
                          .where('pokemonNick', '==', away)
                          .limit(1)
                          .get();
    const awayFB = awayDoc.docs[0];
    const awayPoints = awayFB.data().points;
    const awayWin = awayFB.data().win;

    let homeNewPoints = homePoints;
    let awayNewPoints = awayPoints;

    let homeNewWin = homeWin + homeResult;
    let awayNewWin = awayWin + awayResult;

    if(homeResult > awayResult) {
      homeNewPoints += 3;      
    } else if(homeResult < awayResult) {
      awayNewPoints += 3;
    } else {
      homeNewPoints += 1;      
      awayNewPoints += 1;
    }

    const totalWin = (detail.participantsCount - 1) * 4;  

    const looseHome = totalWin - homeNewWin;
    const PCThome = homeNewWin / (homeNewWin + looseHome);

    const looseAway = totalWin - awayNewWin;
    const PCTaway = awayNewWin / (awayNewWin + looseAway);

    await homeFB.ref.update({
      points:homeNewPoints,
      win: homeNewWin,
      pct:PCThome.toFixed(3),
      updatedAt: new Date()
    })

    await awayFB.ref.update({
      points:awayNewPoints,
      win: awayNewWin,
      pct:PCTaway.toFixed(3),
      updatedAt: new Date()
    })
  } 

  const updateCupMatch = async (match) => {
    const { awayResult, homeResult } = match;
    await tournamentRef.collection('games').doc(match.id).update({
      awayResult, 
      homeResult,
      updateAt: new Date()
    });
    const waitingForResult = games.filter( game => game.round === match.round + 1 && game.customData );    
    if(waitingForResult.length > 0) {      
      const nextMatch = waitingForResult.find( game => game.customData.homeTeam === match.tag || game.customData.awayTeam === match.tag )
      const nextPlayer = nextMatch.customData.homeTeam === match.tag ? 'homeTeam' : 'awayTeam';
      const whoWin = match.homeResult > match.awayResult ? match.homeTeam : match.awayTeam;      
      await tournamentRef.collection('games').doc(nextMatch.id).update({
        [nextPlayer]:whoWin,
        updatedAt: new Date()
      })
    } else {

      const totalMatchs =  games.filter( game => game.round === match.round );            
      const whoWin = match.homeResult > match.awayResult ? match.homeTeam : match.awayTeam;      

      if( totalMatchs.length === 1) {        
        await tournamentRef.update({
          winner: whoWin,
          finished: true,
          updatedAt: new Date()
        })
      } else {

        const {data: nextMatchs } = generator(totalMatchs, { type: 'simple-cup', toBeDefinedValue:'espera' });              
        await Promise.all(        
          nextMatchs.map( async fixedMatch => {
            const {awayTeam, homeTeam, id: tag} = fixedMatch;
    
            const isWinHome = homeTeam.awayTeam === whoWin ? whoWin : homeTeam.homeTeam === whoWin ? whoWin : 'espera' ;
            const isWinAway = awayTeam.awayTeam === whoWin ? whoWin : awayTeam.homeTeam === whoWin ? whoWin : 'espera' ;
    
            const info = {
              awayTeam:isWinAway,
              homeTeam:isWinHome,
              tag,
              round: match.round + 1,
              customData:{
                homeTeam:homeTeam.tag,
                awayTeam:awayTeam.tag
              },
              timestamp: new Date(),
              updatedAt: new Date()
            } 
            await tournamentRef.collection('games').add(info);
          })
        )
      }
      
    }

  }
  
  
  return {
    detail,
    games,
    matchs,
    participants,
    updateMatch,
    updateCupMatch,
  }
}



export default useTournament;