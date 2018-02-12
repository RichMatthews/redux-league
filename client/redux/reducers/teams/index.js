const initialState = [
  {
    name: 'Arsenal',
    position: 1,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    matches: []
  },
  {
    name: 'Manchester United',
    position: 2,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    matches: []
  },
  {
    name: 'Manchester City',
    position: 3,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    matches: []
  },
  {
    name: 'Chelsea',
    position: 4,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    matches: []
  },
  {
    name: 'Spurs',
    position: 5,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    matches: []
  }
];

const workOutWinner = (homeTeam, awayTeam) => {
  if (homeTeam.goals > awayTeam.goals) { return { winners: homeTeam, losers: awayTeam} }
  else if (homeTeam.goals === awayTeam.goals) { return 'draw'}
  else { return { winners: awayTeam, losers: homeTeam }}
}

export default(state = initialState, action) => {
  switch(action.type){
    case 'UPDATE_WINNER': {
      const result = workOutWinner(action.data.homeTeam, action.data.awayTeam)
      return state.map(team => team.name === result.winners.name
        ?
        { ...team,
          won: team.won + 1,
          points: team.points + 3,
          goalsScored: team.goalsScored + result.winners.goals,
          goalsAgainst: team.goalsAgainst + result.losers.goals
        }
        : team )
    }
    case 'UPDATE_LOSER': {
      const result = workOutWinner(action.data.homeTeam, action.data.awayTeam)
      return state.map(team => team.name === result.losers.name
        ?
        { ...team,
          lost: team.lost + 1,
          goalsScored: team.goalsScored + result.losers.goals,
          goalsAgainst: team.goalsAgainst+ result.winners.goals
        }
        : team )
    }
    default:
      return state;
  }
}
