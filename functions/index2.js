const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();

const db = admin.firestore();
const IMAGE = "https://firebasestorage.googleapis.com/v0/b/pokemoncu-f6835.appspot.com/o/FCMImages%2Flogo.png?alt=media&token=67c28416-f3b4-4fff-9f01-79ecf7c68e80";
// const IMAGE = "https://firebasestorage.googleapis.com/v0/b/pokemoncu-f6835.appspot.com/o/logo%20pogo%20cu.jpeg?alt=media&token=37e40e91-d29d-4580-a1ea-486598146fa9";

// test get url action
exports.sendNotification = functions.https.onCall( (data, context) => {
  const { topic, body, title, link } = data;
  const message = {
    notification: {
      title,
      body,
      image: IMAGE,
    },
    webpush: {
      fcm_options: {
        link,
      },
    },
    topic,
  };

  admin.messaging().send(message).then( (response) => {
    console.log("Successfully sent message:", response);
    return response;
  } ).catch( (error) => {
    console.log("Error sending message:", error);
    throw new functions.https.HttpsError("unavailable", "Error al mandar ");
  });
});

exports.addToTopic = functions.https.onCall( (data, context) => {
  const { devices, topic} = data;
  admin.messaging().subscribeToTopic(devices, topic).then( (response) => {
    console.log("Successfully sent message:", response);
    return response;
  } ).catch( (error) => {
    console.log("Error sending message:", error);
    throw new functions.https.HttpsError("unavailable", "Error al mandar ");
  });
});

