import { useFirestore, useFirestoreCollectionData } from "reactfire";

const useNotifications = (topics = []) => {  
  const notificationsRef = useFirestore().collection('notifications');
  const { data: notifications } = useFirestoreCollectionData( notificationsRef.where('topic','in', [...topics,'all']).orderBy('timestamp','desc'),{idField:'id'});
  return {notifications};
}

export default useNotifications
