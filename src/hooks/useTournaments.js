import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { generateSchedule } from "sports-schedule-generator";
import generator from 'tournament-generator';
import faker from 'faker';


const useTournaments = () => {
  
  const tournamentsRef = useFirestore().collection('tournaments');
  const { data: all } = useFirestoreCollectionData(tournamentsRef.orderBy('timestamp', 'desc'), { idField: "id" });  
  
  const create = (tournamentInfo) => {
    const torunament = {
      ...tournamentInfo,
      participantsCount: 0,
      gamesCount: 0,
      finished: false,
      timestamp: new Date(),
      updatedAt: new Date()
    }
   
    return tournamentsRef.add(torunament);
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
      const players = querySnapshot.docs.map( doc => doc.data().pokemonNick);       
  
      if(kind === 'liga') {        
        const schedules = generateSchedule(players);
        await Promise.all(
          schedules.map( async (matchs, index) => {
            await Promise.all(matchs.map( async (match) => {
                await tournamentsRef.doc(id).collection('matchs').add({
                  ...match,
                  day:index + 1,
                  timestamp: new Date(),
                  updatedAt: new Date()
                });
              })
            )})
        )
      } else {
        const {data: games } = generator(players, { type: 'simple-cup', toBeDefinedValue:'espera' });        

        await Promise.all(
          games.map( async (game) => {
            const { id: tag, ...info } = game;            
            const gameData = {
              ...info,
              tag,
              timestamp: new Date(),
              updatedAt: new Date()
            };

            await tournamentsRef.doc(id).collection('games').add(gameData);

            return gameData;
          })
        );

      }
      
      await tournamentsRef.doc(id).update({open:false});
    }
  }

  const addTrainee = async (trainee, type, id, participants) => {
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
        loose:0
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
    await tournamentsRef.doc(id).update({ participantsCount: participants + 1 });
  }

  const addDemoParticipants = async (type, id, participants) => {

    for (let index = 0; index < 7; index++) {
      
      const participant = type === 'liga' ?
        {
          userID: faker.random.uuid(),
          pokemonNick: faker.internet.userName(),
          pokemonID: '123412341234',
          photoURL: `https://robohash.org/${faker.internet.avatar()}.png`,
          email: faker.internet.email(),
          points:0,
          win:0,
          loose:0
        }
        :
        {
          userID: faker.random.uuid(),
          pokemonNick: faker.internet.userName(),
          pokemonID: '123412341234',
          photoURL: `https://robohash.org/${faker.internet.avatar()}.png`,
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
    addDemoParticipants
  }
  
}



export default useTournaments;