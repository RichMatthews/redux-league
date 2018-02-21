import firebase from 'firebase';
import { call, put, select, takeEvery } from 'redux-saga/effects';

const fetchTeamsFromFirebase = () => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('teams/').once('value').then((snapshot) => {
      if (snapshot) {
        const teamsData = Object.values(snapshot.val());
        resolve(teamsData)
      }
    });
  });
};

const fetchMatchesDataFromFirebase = () => {
  return new Promise((resolve, reject) => {
    firebase.database().ref('matches/').once('value').then((snapshot) => {
      if (snapshot) {
        const matchesData = Object.values(snapshot.val());
        resolve(matchesData)
      }
    });
  });
}

const postTeamsToFirebase = (teams) => {
  teams.map((team) => {
    firebase.database().ref('teams/' + team.name).set({
      goalsScored: team.goalsScored,
      drawn: team.drawn,
      goalDifference: team.goalDifference,
      goalsAgainst: team.goalsAgainst,
      goalsScored: team.goalsScored,
      lost: team.lost,
      name: team.name,
      points: team.points,
      text: team.text,
      value: team.value,
      won: team.won,
      matches: team.matches
    });
  });
};

const getMatchMonth = () => {
  const months = ['January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return months[new Date().getMonth()]
}

const postMatchesDataToFirebase = (match) => {
  const uniqueid = "uniqueid_" + new Date().getTime();
  firebase.database().ref('matches/').child(uniqueid).set({
    homeTeam: match.homeTeam.name,
    awayTeam: match.awayTeam.name,
    homeGoals: match.homeTeam.goals,
    awayGoals: match.awayTeam.goals,
    month: getMatchMonth()
  });
}

function* fetchTeams() {
  try {
    const teams = yield call(fetchTeamsFromFirebase);
    yield put({type: "TEAMS_FETCH_SUCCEEDED", teams: teams});
  } catch (e) {
    yield put({type: "TEAMS_FETCH_FAILED", message: e.message});
  }
}

function* fetchMatches(action) {
  try {
    const teams = yield call(fetchMatchesDataFromFirebase);
    yield put({type: "MATCHES_FETCH_SUCCEEDED", teams: teams});
  } catch (e) {
    yield put({type: "TEAMS_FETCH_FAILED", message: e.message});
  }
}

function* postMatches(action) {
  try {
    const match = yield call(postMatchesDataToFirebase, action.match);
    yield put({type: "MATCHES_POST_SUCCEEDED", match: match});
  } catch (e) {
    yield put({type: "TEAMS_POST_FAILED", message: e.message});
  }
}

function* postTeams(action) {
  try {
    const getState = (state) => state.teams
    const teamsState = yield select(getState)
    const teams = yield call(postTeamsToFirebase, teamsState); // WORKS WITH TEAMSTATE....WHYYYYY?!?!?
    yield put({type: "TEAMS_POST_SUCCEEDED", teams: teams});
  } catch (e) {
    yield put({type: "TEAMS_POST_FAILED", message: e.message});
  }
}

function* rootSaga() {
  yield takeEvery("SYNC_FIREBASE_TO_STORE", fetchTeams);
  yield takeEvery("SYNC_STORE_TO_FIREBASE", postTeams);
  yield takeEvery("SYNC_FIREBASE_TO_STORE", fetchMatches);
  yield takeEvery("POST_MATCH_TO_FIREBASE", postMatches);
}

export default rootSaga;
