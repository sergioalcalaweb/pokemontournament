import { useState } from "react";
import { useUser, useFirestore, useFirestoreDocData, useFirestoreCollectionData } from "reactfire";


const useTrainee = () => {

  const firestore = useFirestore();

  const { data: userAuth } = useUser();
  const userDetailsRef = firestore
    .collection('users')
    .doc(userAuth.uid);
  
  const notificationsRef = firestore
    .collection('notifications');
  
  const { data: notifications } = useFirestoreCollectionData(notificationsRef.orderBy('timestamp', 'desc'), { idField: "id" });  

    
  const { data: userFirebase } = useFirestoreDocData(userDetailsRef);
  
  const [info, setInfo] = useState({
    displayName: userAuth.displayName,
    photoURL: userAuth.photoURL,
    email: userAuth.email,
    id:userAuth.uid,        
    pokemonNick: userFirebase.pokemonNick,    
    pokemonID: userFirebase.pokemonID,
    admin: userFirebase.admin,
    devices: userFirebase.devices || [],
  });

    
  const usersDetailsRef = useFirestore()
    .collection('users');

  const { data: users } = useFirestoreCollectionData(usersDetailsRef,  { idField: "id" });

  const userTournaments = userDetailsRef.collection('tournaments');
  const { data: tournaments } = useFirestoreCollectionData(userTournaments);

  const update = async (newInfo) => {
    const userFB = {
      ...info,
      ...newInfo      
    };

    if(userFirebase.pokemonID) {
      await userDetailsRef.update(userFB);      
    } else {      
      userFB.admin = false;
      await usersDetailsRef.doc(userAuth.uid).set(userFB);
    }
    setInfo(userFB);
  }

  const addTournament = (tournamentId, topic) => {
    return userTournaments.add({tournamentId, topic});
  }

  const toggleAdmin = (id, admin) => {    
    return usersDetailsRef.doc(id).update({
      admin
    });
  }

  const addDevice = (device) => {
    info.devices.push(device);
    return userDetailsRef.update({
      devices:info.devices
    });
  }

  const deleteDevice = (device) => {    
    const index = info.devices.indexOf(device);
    info.devices.splice(index, 1);        
    return userDetailsRef.update({
      devices:info.devices
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
    addDevice,
    addTournament,
    deleteTorunament,
    deleteDevice,
    info,
    toggleAdmin,
    tournaments,
    update,
    notifications,
    users,
  }
}



export default useTrainee;