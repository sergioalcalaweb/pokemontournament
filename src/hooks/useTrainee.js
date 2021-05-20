import { useState } from "react";
import { useUser, useFirestore, useFirestoreDocData, useFirestoreCollectionData } from "reactfire";


const useTrainee = () => {

  const firestore = useFirestore();

  const { data: userAuth } = useUser();
  const userDetailsRef = firestore
    .collection('users')
    .doc(userAuth.uid);

    
  const { data: userFirebase } = useFirestoreDocData(userDetailsRef);
  const [info, setInfo] = useState({
    displayName: userAuth.displayName,
    photoURL: userAuth.photoURL,
    email: userAuth.email,
    pokemonNick: userFirebase.pokemonNick,    
    pokemonID: userFirebase.pokemonID,
    admin: userFirebase.admin,
    id:userAuth.uid        
  });
    
  const usersDetailsRef = useFirestore()
    .collection('users')

  const { data: users } = useFirestoreCollectionData(usersDetailsRef,  { idField: "id" });

  const userTournaments = userDetailsRef.collection('tournaments');
  const { data: tournaments } = useFirestoreCollectionData(userTournaments);

  const update = async (newInfo) => {
    const userFB = {
      ...info,
      ...newInfo
    }
    await userDetailsRef.update(userFB);
    setInfo(userFB);
  }

  const addTournament = (tournamentId) => {
    return userTournaments.add({tournamentId});
  }

  const toggleAdmin = (id, admin) => {
    return usersDetailsRef.doc(id).update({
      admin
    });
  }

  const deleteTorunament = async (id) => {
    const userTournament = await userTournaments.where('tournamentId','==', id).get();  
    if( userTournament.docs.length > 0) {      
      await Promise.all(
        userTournament.docs.map( async tournament => await tournament.ref.delete() ) 
      )
    }
  }

  return {
    addTournament,
    deleteTorunament,
    info,
    toggleAdmin,
    tournaments,
    update,
    users,
  }
}



export default useTrainee;