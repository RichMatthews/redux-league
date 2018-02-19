import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyCz9gQbkQf1h4iZT_4QdRK3tC0XoLqQCdA",
  authDomain: "redux-league.firebaseapp.com",
  databaseURL: "https://redux-league.firebaseio.com",
  projectId: "redux-league",
  storageBucket: "redux-league.appspot.com",
  messagingSenderId: "352718883498"
};
const fire = firebase.initializeApp(config);
export default fire;
