export const submitMatch = (home, away) => ({
  type: 'SUBMIT_MATCH',
  data: {
    homeTeam: home,
    awayTeam: away
  }
});

export const updateWinner = (home, away) => ({
  type: 'UPDATE_WINNER',
  data: {
    homeTeam: home,
    awayTeam: away
  }
});

export const updateLoser = (home, away) => ({
  type: 'UPDATE_LOSER',
  data: {
    homeTeam: home,
    awayTeam: away
  }
});
