const admin = require("firebase-admin");
const functions = require("firebase-functions");
admin.initializeApp();

const db = admin.firestore();
const IMAGE = "https://firebasestorage.googleapis.com/v0/b/pokemoncu-f6835.appspot.com/o/FCMImages%2Flogo.png?alt=media&token=67c28416-f3b4-4fff-9f01-79ecf7c68e80";

const sendNotifications = (title, body, link, topic) => {
  const message = {
    notification: {
      title,
      body,
      image: IMAGE,
    },
    android:{
      priority:"HIGH",
      data:{
        open_url:link
      },
      notification: {
        icon: IMAGE,
        image: IMAGE,
        title,
        visibility:"public",
        notification_priority:"PRIORITY_HIGH",
        color:"#418bac",
        body,
        click_action:link
      },
    },
    webpush: {
      notification: {
        icon: IMAGE,
        image: IMAGE,
        requireInteraction:true
      },
      fcm_options: {
        link,
      },
    },
    topic,
  };

  admin.messaging().send(message).then( (response) => {
    console.log("Successfully sent message:", response);
  } ).catch( (error) => {
    console.log("Error sending message:", error);
  });
};

const deleteNotification = async (topic, tournament) => {
  let notificationsTopic = db.collection("notifications").where("topic","==",topic);
  const notificationsDelete = await notificationsTopic.get();
  return Promise.all(          
    notificationsDelete.docs.map( async notification => await notification.ref.delete()  )
  )
}

exports.tournamentCreate = functions.firestore
    .document("tournaments/{tournamentID}")
    .onCreate( async (snap, context) => {
      const info = snap.data();      
      const id = context.params.tournamentID;

      if (info.open) {
        const title = `Ya puedes inscribirte a ${info.title}`;
        const body = `Inscribete a la ${info.kind} y prepara a tus pokemon mas poderosos`;
        const link = "/torneos";
        const notification = {
          title,
          body,
          url: link,
          tournament: id,
          timestamp: new Date(),
          topic:"all"
        };        
        db.collection("notifications").add(notification);
        sendNotifications(title, body, link, "all");

      } else if (info.started) {

        const title = `${info.title}`;
        const body = "Los enfrentamientos de la liguilla están disponibles !PREPARATE!";
        const link = `/mistorneos/${id}`;
        const notification = {
          title,
          body,
          url: link,
          tournament: id,
          timestamp: new Date(),
          topic:info.topic
        };        
        db.collection("notifications").add(notification);
        sendNotifications(title, body, link, info.topic);
      }
    });


exports.tournamentOpen = functions.firestore
    .document("tournaments/{tournamentID}")
    .onUpdate( async (change, context) => {
      const infoAfter = change.after.data();
      const infoBefore = change.before.data();
      const id = context.params.tournamentID;

      if (infoAfter.open && !infoBefore.open) {
        const title = `Ya puedes inscribirte a ${infoAfter.title}`;
        const body = `Inscribete a la ${infoAfter.kind} y prepara a tus pokemon mas poderosos`;
        const link = "/torneos";
        const notification = {
          title,
          body,
          url: link,
          tournament: id,
          topic:"all",
          timestamp: new Date(),
        };        
        db.collection("notifications").add(notification);
        sendNotifications(title, body, link, "all");
      } else if (infoAfter.day > infoBefore.day) {
        await deleteNotification(infoAfter.topic); 
        const title = `Jornada ${infoAfter.day} lista para jugar`;
        const body = `${infoAfter.title}`;
        const link = `/mistorneos/${id}`;
        const topic = infoAfter.topic;
        const notification = {
          title,
          body,
          url: link,
          tournament: id,
          topic,
          timestamp: new Date()
        };        
        db.collection("notifications").add(notification);
        sendNotifications(title, body, link, topic);
      } else if (infoAfter.repechage && !infoBefore.repechage) {
        const title = "Repechaje listo para jugar";
        const body = `${infoAfter.title}`;
        const link = `/mistorneos/${id}`;
        const topic = infoAfter.topic;
        const notification = {
          title,
          body,
          url: link,
          tournament: id,
          topic,
          timestamp: new Date()
        };        
        db.collection("notifications").add(notification);
        sendNotifications(title, body, link, topic);
      } else if (infoAfter.round > infoBefore.round) {

        let title = "";
        const games = ["","Cuartos de final listas","Semifinales listas", "La final lista"];
        if(infoAfter.kind === "liga") {
          title = `${games[infoAfter.round]} para jugar`
        }  else {
          title = "Sieguiente ronda lsita para jugar";
        }  

        const body = `${infoAfter.title}`;
        const link = `/mistorneos/${id}`;
        const topic = infoAfter.topic;
        const notification = {
          title,
          body,
          url: link,
          tournament: id,
          topic,
          timestamp: new Date()
        };        
        db.collection("notifications").add(notification);
        sendNotifications(title, body, link, topic);
      }else if ( !infoBefore.finished && infoAfter.finished) {
        await deleteNotification(infoAfter.topic);        
      } else if (infoAfter.started && !infoBefore.started) {
        await deleteNotification("all");  
        if(infoBefore.kind === "copa") {
          const title = `${info.title}`;
          const body = "Los enfrentamientos de la copa están disponibles !PREPARATE!";
          const link = `/mistorneos/${id}`;
          const topic = infoBefore.topic;
          const notification = {
            title,
            body,
            url: link,
            tournament: id,
            timestamp: new Date(),
            topic
          };        
          db.collection("notifications").add(notification);
          sendNotifications(title, body, link, topic);
        } 
      }
    });

exports.userToTournament = functions.firestore
    .document("users/{userID}/tournaments/{tournamentInfo}")
    .onCreate( async (snap, context) => {
      const tournamentID = snap.data().tournamentId;
      const tournamentInfo = await db.collection("tournaments").doc(tournamentID).get();
      const tournamentData = tournamentInfo.data();
      const user = context.params.userID;
      const userInfo = await db.collection("users").doc(user).get(); 
      const userData = userInfo.data();
      console.log(tournamentData, userData);
      if (userData.devices.length > 0) {        
        admin.messaging()
            .subscribeToTopic(userData.devices, tournamentData.topic)
            .then(resp => console.log("Add user to tournament", resp))
            .catch(err => console.log(err));
      }
    });

exports.newDevice = functions.firestore
    .document("users/{userID}")
    .onUpdate( (change, context) => {
      const previousInfo = change.before.data();
      const newInfo = change.after.data();
      if (newInfo.devices.length > previousInfo.devices.length) {
        const deviceToAdd = newInfo.devices
            .filter( (device) => !previousInfo.devices.includes(device) );
        admin.messaging()
            .subscribeToTopic(deviceToAdd, "all")
            .then(resp => console.log("Add user to all topic", resp))
            .catch(err => console.log(err));
      }
    });

exports.dayOpen = functions.https.onCall( (data, context) => {
  const { topic, body, title } = data;
  const message = {
    notification: {
      title,
      body,
      image: IMAGE,
    },
    webpush: {
      fcm_options: {
        link: "/mistorneos",
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

// test get url action
exports.sendNotification = functions.https.onRequest( (req, res) => {
  const message = {
    notification: {
      title: "Ya puedes inscribirte a Temporada 1",
      body: "Inscribete a la liga y prepara a tus pokemon mas poderosos",
      image: "https://firebasestorage.googleapis.com/v0/b/pokemoncu-f6835.appspot.com/o/logo%20pogo%20cu.jpeg?alt=media&token=37e40e91-d29d-4580-a1ea-486598146fa9",
    },
    webpush: {
      fcm_options: {
        link: "/torneos",
      },
    },
    topic: "all",
  };

  admin.messaging().send(message).then( (response) => {
    console.log("Successfully sent message:", response);
  } ).catch( (error) => {
    console.log("Error sending message:", error);
  });
});

