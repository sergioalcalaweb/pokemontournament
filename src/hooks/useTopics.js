import { useFirestore, useFirestoreCollectionData } from "reactfire";

const useTopics = (id = null) => {

  const firestore = useFirestore();
  const topicRef = firestore.collection('topics');
  const { data: topics } = useFirestoreCollectionData(topicRef.orderBy('timestamp', 'desc'), { idField: "id" });  

  const addTopic = (info) => {
    return topicRef.add({
      ...info,
      timestamp: new Date(),
      updatedAt: new Date()
    });
  }

  const updateTopic = (info) => {
    const { id, ...updateInfo } = info;
    return topicRef.doc(id).update({
      ...updateInfo,
      updatedAt: new Date()
    });
  }

  const deleteTopic = (id) => {
    return topicRef.doc(id).delete();
  }

  const getDetail = async (id) => {
    const info = await topicRef.doc(id).get(); 
    return info.data();
  }


  return {
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
    getDetail,
  }
  
}



export default useTopics;