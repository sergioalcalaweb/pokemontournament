import { useFirestore, useFirestoreCollectionData, useFirestoreDocData, useFunctions } from "reactfire";
import generator from 'tournament-generator';

const useTournament = (id) => {

  const functions = useFunctions();
  const firestore = useFirestore();
  
  const tournamentRef = firestore
    .collection('tournaments')
    .doc(id);   
    
  const { data: detail } =  useFirestoreDocData(tournamentRef);
  
  const { data: participants } =  useFirestoreCollectionData(
                                    tournamentRef
                                    .collection('participants')
                                    .orderBy('points', 'desc')
                                    .orderBy('pct', 'desc'), 
                                    { idField: "id" }
                                  );
  const { data: rules } =  useFirestoreCollectionData(
                              tournamentRef
                              .collection('rules'),
                              { idField: "id" }
                            );
  const { data: topic } =  useFirestoreDocData(tournamentRef.collection('rules').doc('topic'));                       

  const { data: participantsCup } =  useFirestoreCollectionData(
                                      tournamentRef
                                      .collection('participants'), 
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
  const { data: repechages } =  useFirestoreCollectionData(
                              tournamentRef
                              .collection('repechage')
                              .orderBy('order', 'asc'),                              
                              { idField: "id" }
                            );  
  const { data: finals } =  useFirestoreCollectionData(
                              tournamentRef
                              .collection('finals')
                              .orderBy('order', 'asc'),                              
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

  const deleteMatch = async (match) => {
    const {awayResult, homeResult, id, home, away} = match;
    const matchRef = tournamentRef.collection('matchs').doc(id);
    await matchRef.update({
      awayResult,
      homeResult,
      close: false,
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

    let homeNewWin = homeWin - homeResult;
    let awayNewWin = awayWin - awayResult;

    if(homeResult > awayResult) {
      homeNewPoints -= 3;      
    } else if(homeResult < awayResult) {
      awayNewPoints -= 3;
    } else {
      homeNewPoints -= 1;      
      awayNewPoints -= 1;
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
          started: false,
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

  const updateFinalMatch = async (info) => {    

    if(info.type === 'repechage') {

      const repechage = repechages[info.roundIndex];
      const home = repechage.seeds[info.setIndex].teams[0];
      const away = repechage.seeds[info.setIndex].teams[1];
  
      repechage.winner = info.homeResult > info.awayResult ? home : away;
      repechage.position = info.homeResult > info.awayResult ? home.position : away.position;
      
      home.score = info.homeResult;
      away.score = info.awayResult;

  
      const {id,title, type, ...data} = repechage;
      await tournamentRef.collection(type).doc(id).update(data);
      const repechageCompleted = repechages.filter( rep => rep.winner );      
      if(repechageCompleted.length > 1) {
        await addToFinals();
        return tournamentRef.update({
          repechage:false
        });
      }
    } else {

      const final = finals[info.roundIndex];
      const finalGames = final.seeds[info.setIndex];
      const home = finalGames.teams[0];
      const away = finalGames.teams[1];
  
      final.winner = info.homeResult > info.awayResult ? home : away;      
      home.score = info.homeResult;
      away.score = info.awayResult;
  
      const { id,title, type, ...data } = final;            
      await tournamentRef.collection(type).doc(id).update(data);
      const { score, ...winner } = final.winner;
      return nextStep(winner, info.roundIndex, finalGames.id);

    }
  }

  const finish = () => {
    return tournamentRef.update({      
      finished: true,
      started: false,
      updatedAt: new Date()
    })
  }

  const addRule = (topicID, day) => {
    return tournamentRef.collection('rules').add({      
      day,
      topicID,
      updatedAt: new Date()
    })
  }

  const addTopic = (topic) => {
    const { updatedAt, timestamp, id, ...info } = topic;
    return tournamentRef.collection('rules').doc('topic').set({      
      ...info,
      timestamp: new Date(),
      updatedAt: new Date()
    });
  }

  const sendNotification = (info) => {
    const openDay = functions.httpsCallable('dayOpen');
    return openDay(info)
  }

  const updateDay = (day, open) => {    
    const gameDay = open ? detail.day + 1 : detail.day - 1;
    return tournamentRef.update({
      day:gameDay,
      updatedAt: new Date()
    });
  }

  const openRound = (round) => {    
    const gameRound = detail.round + 1;
    return tournamentRef.update({
      round:gameRound,
      updatedAt: new Date()
    });
  }

  const deleteParticipant = async (trainee) => {
    await tournamentRef.collection('participants').doc(trainee.id).delete();
    const userTournament = await firestore.collection('users')
          .doc(trainee.userID)
          .collection('tournaments')
          .where('tournamentId', '==', id)
          .limit(1)
          .get();

    const idTournament = userTournament.docs[0].id;
    await firestore.collection('users')
          .doc(trainee.userID)
          .collection('tournaments')
          .doc(idTournament)
          .delete();

    await tournamentRef.update({
      participantsCount:detail.participantsCount - 1
    })
  }

  const createFinals = async (participans) => {
    
    const finalPlayers = participans.slice().map( ({userID, pokemonNick, photoURL}) => ({userID, pokemonNick, photoURL}) );
    const repechagePlayers = finalPlayers.splice(6, 4).map( (player,index) => ({...player, position:index + 7}) );
    const repechage1 = {
      title: 'Repechaje',
      type:'repechage',
      order:1,
      seeds: [
        {
          id: 'RP1',        
          teams: [ repechagePlayers[0], repechagePlayers[3] ],
        }      
      ],
    };

    const repechage2 = {
      title: 'Repechaje',
      type:'repechage',
      order:2,
      seeds: [
        {
          id: 'RP2',        
          teams: [ repechagePlayers[1], repechagePlayers[2] ],
        }      
      ],
    };

    await tournamentRef.collection('repechage').add(repechage1);
    await tournamentRef.collection('repechage').add(repechage2);

    const quarter = {
      title: 'Cuartos',
      order:1,
      type:'finals',
      seeds: [
        {
          id: 'CF1',        
          teams: [finalPlayers[0], { name: 'En Espera' }],
        },
        {
          id: 'CF2',        
          teams: [finalPlayers[3], finalPlayers[4]],
        },
        {
          id: 'CF3',        
          teams: [finalPlayers[1], { name: 'En Espera' }],
        },
        {
          id: 'CF4',        
          teams: [finalPlayers[2], finalPlayers[5]],
        },
      ],
    };

    const semis = {
      title: 'Semifinales',
      order:2,
      type:'finals',
      seeds: [
        {
          id: 'SF1',        
          teams: [{ name: 'En Espera', id:'CF1' }, { name: 'En Espera', id:'CF2' }],
        },
        {
          id: 'SF2',        
          teams: [{ name: 'En Espera', id:'CF3' }, { name: 'En Espera', id:'CF4' }],
        },
      ],
    };

    const finals = {
      title: 'Final',
      type:'finals',
      order:3,
      seeds: [
        {
          id: 'F1',        
          teams: [{ name: 'En Espera', id:'SF1' }, { name: 'En Espera', id:'SF2' }],
        },
      ],
    };

    await tournamentRef.collection('finals').add(quarter);
    await tournamentRef.collection('finals').add(semis);
    await tournamentRef.collection('finals').add(finals);

    return tournamentRef.update({
      repechage:true,
      finals:true
    });
    
  }

  const addToFinals = () => {
    const repechage1 = repechages[0];
    const repechage2 = repechages[1];
    const quarters = finals[0];
    const {score: scr1, ...repechage1User} = repechage1.winner;
    const {score: scr2, ...repechage2User} = repechage2.winner;    
    quarters.seeds[0].teams[1] = repechage1.position > repechage2.position ? repechage1User: repechage2User;
    quarters.seeds[2].teams[1] = repechage1.position > repechage2.position ? repechage2User: repechage1User;
    const {id, ...info} = quarters;
    return tournamentRef.collection('finals').doc(id).update(info);
  }

  const nextStep = (winner, round, id) => {
    if(finals.length === round + 1) {      
      return tournamentRef.update({
        winner,
        finished: true,
        started: false,
        updatedAt: new Date()
      })
    } else {
      const nextRound = round + 1;
      const final = finals[nextRound];
      const seed = final.seeds.find( seed => seed.teams[0].id === id || seed.teams[1].id === id );
      const seedIdx = final.seeds.indexOf(seed);
      const team = final.seeds[seedIdx].teams.find( team => team.id === id);    
      const teamIdx = final.seeds[seedIdx].teams.indexOf(team);    
      final.seeds[seedIdx].teams[teamIdx] = winner;
      const { id:docID, seeds } = final;    
      
      return tournamentRef.collection('finals').doc(docID).update({
        seeds
      });
    }
  }
  
  return {
    addTopic,
    addRule,
    detail,
    games,
    matchs,
    finish,
    participants,
    updateMatch,
    updateCupMatch,
    participantsCup,
    rules,
    topic,
    updateDay,
    deleteParticipant,
    sendNotification,
    deleteMatch,
    createFinals,
    repechages,
    finals,
    updateFinalMatch,
    addToFinals,
    openRound
  }
}



export default useTournament;