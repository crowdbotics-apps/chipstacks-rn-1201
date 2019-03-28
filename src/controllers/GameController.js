import firebase from 'react-native-firebase';
import { UserController } from 'app/controllers';

const Auth = firebase.auth();
const Firestore = firebase.firestore();

// search games with the criteria
const getGames = async () => {
  let gameCollection = Firestore.collection('games');

  try {
    let snapshot = await gameCollection.get();
    let tasks = snapshot.docs.map((gameDoc) => getGameById(gameDoc.id));
    let games = Promise.all(tasks);
    return games;
  } catch (error) {
    throw error;
  }
};

const getGameById = async (gameId) => {
  let gameCollection = Firestore.collection('games');

  try {
    let snapshot = await gameCollection.doc(gameId).get();
    let game = await snapshot.data();
    const admin = await UserController.getUserById(game.admin);
    game.admin = admin;
    return game;
  } catch (error) {
    throw error;
  }
};

const addGame = async (payload) => {
  try {
    const uid = Auth.currentUser.uid;
    let gameId;
    let timeStamp = new Date();
    await Firestore.collection('games')
      .add({
        buyin: payload.buyin,
        rebuy: payload.rebuy,
        fee: payload.fee,
        name: payload.name,
        active: payload.active || true,
        admin: uid,
        players: payload.players,
        date: payload.date,
        time: payload.time,
        place: payload.place || '',
        status: 0, // not started; 1 - started; 2 - finished
        createdAt: timeStamp.getTime()
      })
      .then((docRef) => {
        gameId = docRef.id;
        Firestore.collection('games')
          .doc(docRef.id)
          .set(
            {
              id: docRef.id
            },
            { merge: true }
          );
      })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });

    await payload.players.map(async (player) => {
      await Firestore.collection('notifications').add({
        type: 'invite',
        status: 0, //unread
        sender: uid,
        receiver: player.userId,
        gameId: gameId,
        createdAt: timeStamp.getTime()
      });
    });
  } catch (error) {
    throw error;
  }
};

const acceptGame = async (payload) => {
  let timeStamp = new Date();
  try {
    const uid = Auth.currentUser.uid;
    await payload.players.map(async (player) => {
      if (player.userId === uid) {
        player.status = 1; //accepted
      }
    });

    await Firestore.collection('games')
      .doc(payload.id)
      .set(
        {
          players: payload.players
        },
        { merge: true }
      );

    await Firestore.collection('notifications').add({
      type: 'accept',
      status: 0, //unread
      sender: uid,
      receiver: payload.admin,
      gameId: payload.id,
      createdAt: timeStamp.getTime()
    });
  } catch (error) {
    throw error;
  }
};

const declineGame = async (payload) => {
  let timeStamp = new Date();
  try {
    const uid = Auth.currentUser.uid;
    await payload.players.map(async (player, key) => {
      if (player.userId === uid) {
        delete payload.players[key];
      }
    });

    await Firestore.collection('games')
      .doc(payload.id)
      .set(
        {
          players: payload.players
        },
        { merge: true }
      );

    await Firestore.collection('notifications').add({
      type: 'decline',
      status: 0, //unread
      sender: uid,
      receiver: payload.admin,
      gameId: payload.id,
      createdAt: timeStamp.getTime()
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getGameById,
  getGames,
  addGame,
  acceptGame,
  declineGame
};
