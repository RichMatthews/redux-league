export const submitMatch = (home, away) => ({
  type: 'SUBMIT_MATCH',
  data: {
    homeTeam: home,
    awayTeam: away
  }
});

export const updateTable = (home, away) => ({
  type: 'UPDATE_TABLE',
  data: {
    homeTeam: home,
    awayTeam: away
  }
});

export const syncFirebaseToStore = (data) => ({
  type: 'SYNC_FIREBASE_TO_STORE',
  data: data
});

export const syncStoreToFirebase = (data) => ({
  type: 'SYNC_STORE_TO_FIREBASE',
  data: data
})

export const teamsFetchSucceeded = (teams) => ({
  type: 'TEAMS_FETCH_SUCCEEDED',
  data: teams
});

export const matchesFetchSucceeded = (teams) => ({
  type: 'MATCHES_FETCH_SUCCEEDED',
  data: teams
});

export const teamsPostSucceeded = (teams) => ({
  type: 'TEAMS_POST_SUCCEEDED',
  teams: teams
});

export const matchesPostSucceeded = (matches) => ({
  type: 'MATCHES_POST_SUCCEEDED',
  matches: matches
});

export const postMatchToFirebase = (home, away) => ({
  type: 'POST_MATCH_TO_FIREBASE',
  match: {
    homeTeam: home,
    awayTeam: away
  }
})

export const emptyInputError = () => ({
  type: 'EMPTY_INPUT_ERROR'
})
