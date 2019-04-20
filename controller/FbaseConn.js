import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

// const settings = {timestampsInSnapshots: true};

var config = {
  apiKey: "AIzaSyCgQgTPvcaobO8mRJO5Zjrpl3oq_sP6DJE",
   authDomain: "fkm-6c21e.firebaseapp.com",
   databaseURL: "https://fkm-6c21e.firebaseio.com",
   projectId: "fkm-6c21e",
   storageBucket: "fkm-6c21e.appspot.com",
   messagingSenderId: "261820872913"
};
firebase.initializeApp(config);

// firebase.firestore().settings(settings);

export default firebase;
