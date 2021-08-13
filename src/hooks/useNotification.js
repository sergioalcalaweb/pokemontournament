import { useFirestore, useFirestoreCollectionData, useFunctions } from 'reactfire';

const useNotification = () => {

  const functions = useFunctions();
  const firestore = useFirestore();
  const notificationsRef = firestore
    .collection('notifications');
  const { data: notifications } = useFirestoreCollectionData(notificationsRef, { idField: "id" }); 
  
  const sendNotification = (data) => {

  }

  const tournamentNotification = async  (id, type) => {

    try {
      const tournament = await firestore.collection('tournaments').doc(id).get();
      const info = tournament.data();
  
      if(type === 'open') {
        const title = `Ya puedes inscribirte a ${info.title}`;
        const body = `Inscribete a la ${info.kind} y prepara a tus pokémon`;
        const link = "/torneos";
      
        const notification = {
          title,
          body,
          url: link,
          tournament: id
        };        
        await notificationsRef.add(notification);  
        // const sendNotification = functions.httpsCallable('sendNotification');
        // await sendNotification({title, link, body, topic:'all'});        
      }
    } catch (error) {
      console.log(error);            
    }
  }

  const subscribeTopic = (data) => {  
    console.log(data);  
    const addTopic = functions.httpsCallable('addToTopic');
    return addTopic(data);
  }

  return {
    notifications,
    sendNotification,
    subscribeTopic,
    tournamentNotification
  }
}

export default useNotification
