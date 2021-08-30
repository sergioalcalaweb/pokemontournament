import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { generateSchedule } from "sports-schedule-generator";
import generator from 'tournament-generator';
import faker from 'faker';
import { generateTournament } from '../services/tournament'


const getTopic = () => {
  return `notification_${Math.ceil(Math.random() * 10000)}`;
}


const useTournaments = () => {
  
  const firestore = useFirestore();
  const tournamentsRef = firestore.collection('tournaments');
  const { data: all } = useFirestoreCollectionData(tournamentsRef.orderBy('timestamp', 'desc'), { idField: "id" });  

  const createCupFromLeague = async (players, title, topic) => {
    
    const tournament = {
      kind:'copa',
      title:`Liguilla - ${title}`,
      open:false,
      participantsCount: players.length,
      gamesCount: 0,
      day:0,
      round:0,
      finished: false,
      started:true,
      topic,
      timestamp: new Date(),
      updatedAt: new Date()
    }

    const participants = players.map( ({email, id, photoURL, pokemonID, pokemonNick, userID}) => ({email, id, photoURL, pokemonID, pokemonNick, userID}) );    
    const tournamentInfo = await tournamentsRef.add(tournament); 
    const cupID = tournamentInfo.id;
    await Promise.all( participants.map( async (trainee, index) => {
      await addTrainee(trainee, 'copa', cupID, index);
      if(trainee.pokemonID !== '123412341234') {
        await firestore.collection('users').doc(trainee.userID).collection('tournaments').add({tournamentId:cupID, topic})
      }
    }))
    return close(cupID, 'copa');    
  }
  
  const create = (tournamentInfo) => {
    const tournament = {
      ...tournamentInfo,
      participantsCount: 0,
      gamesCount: 0,
      finals:false,
      repechage:false,
      finished: false,
      started: false,
      topic:getTopic(),
      timestamp: new Date(),
      updatedAt: new Date()
    }
    return tournamentsRef.add(tournament);
  }

  const erase = (id) => {
    return tournamentsRef.doc(id).delete();
  }

  const open = async (id) => {
    const tournamentRef = tournamentsRef.doc(id);
    const matches = await tournamentRef.collection('matchs').get();
    if( matches.docs.length > 0) {
      await Promise.all(
        matches.docs.map( async match => await match.ref.delete() ) 
      )
    }
    await tournamentRef.update({open:true});
  }

  const close = async (id, kind) => {
    const querySnapshot = await tournamentsRef.doc(id).collection('participants').get();    
    if(querySnapshot.docs.length > 0) {
      if(kind === 'liga') {        
        const players = querySnapshot.docs.map( doc => doc.data().pokemonNick);
        const schedules = generateSchedule(players);
        await Promise.all(
          schedules.map( async (matchs, index) => {
            await Promise.all(matchs.map( async (match) => {
                await tournamentsRef.doc(id).collection('matchs').add({
                  ...match,
                  day:index + 1,
                  available: false,
                  timestamp: new Date(),
                  updatedAt: new Date()
                });
              })
            )})
        )
      } else {
        const players = querySnapshot.docs.map( doc => doc.data() );
        const {data: matchs } = generator(players, { type: 'simple-cup', toBeDefinedValue:'En espera' });
        const games = generateTournament(matchs);
        await Promise.all(
          games.map( async (game) => {
          
            const gameData = {
              ...game,
              timestamp: new Date(),
              updatedAt: new Date()
            };
            await tournamentsRef.doc(id).collection('games').add(gameData);
            return gameData;
          })
        );
      }

      await tournamentsRef.doc(id).update({open:false, started: true});
    }
  }

  const addTrainee = async (trainee, type, id) => {
    const { pokemonNick, pokemonID, photoURL, email, id: userID } = trainee;
    const participant = type === 'liga' ?
      {
        userID,
        pokemonNick,
        pokemonID,
        photoURL,
        email,
        points:0,
        win:0,
        pct:0,
        lose:0,
        setWin:0,
        setTie:0,
        setLose:0
      }
      :
      {
        userID,
        pokemonNick,
        pokemonID,
        photoURL,
        email,
      };
    await tournamentsRef.doc(id).collection('participants').add(participant);

    const queryPlayers = await tournamentsRef.doc(id).collection('participants').get();    
    await tournamentsRef.doc(id).update({ participantsCount:queryPlayers.docs.length });
  }

  const addDemoParticipants = async (type, id, participants) => {
    for (let index = 0; index < 7; index++) {
      const participant = type === 'liga' ?
        {
          userID: faker.random.uuid(),
          pokemonNick: faker.internet.userName(),
          pokemonID: '123412341234',
          photoURL: `https://robohash.org/${faker.internet.userName()}`,
          email: faker.internet.email(),
          points:0,
          win:0,
          pct:0,
          lose:0,
          setWin:0,
          setTie:0,
          setLose:0
        }
        :
        {
          userID: faker.random.uuid(),
          pokemonNick: faker.internet.userName(),
          pokemonID: '123412341234',
          photoURL: `https://robohash.org/${faker.internet.userName()}`,
          email: faker.internet.email(),
        };
      await tournamentsRef.doc(id).collection('participants').add(participant);
    }
    await tournamentsRef.doc(id).update({ participantsCount: participants + 7 });
  }
  
  return {
    all,
    create,
    erase,
    open,
    close,
    addTrainee,
    addDemoParticipants,
    createCupFromLeague
  }
  
}



export default useTournaments;