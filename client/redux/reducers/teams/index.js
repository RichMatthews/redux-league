const initialState = [];

const workOutWinner = (homeTeam, awayTeam) => {
  if (homeTeam.goals > awayTeam.goals) { return { winners: homeTeam, losers: awayTeam} }
  else if (homeTeam.goals === awayTeam.goals) { return { home: homeTeam, away: awayTeam } }
  else { return { winners: awayTeam, losers: homeTeam }}
}

export default(state = initialState, action) => {
  switch(action.type){
    case 'UPDATE_TABLE': {
      const result = workOutWinner(action.data.homeTeam, action.data.awayTeam)
      const data = action.data;
      const winners = result.winners;
      const losers = result.losers;
      const home = result.home;
      const away = result.away;
      // const whoWasAtHome = data.homeTeam.name === winners.name ? true : false
      if (data.homeTeam.goals !== data.awayTeam.goals){
        return state.map(team => team.name === winners.name
          ?
          { ...team,
            won: team.won + 1,
            points: team.points + 3,
            goalsScored: team.goalsScored + winners.goals,
            goalsAgainst: team.goalsAgainst + losers.goals,
            matches: [].concat(team.matches).concat({opposition: losers.name, goalsScored: winners.goals, goalsAgainst: losers.goals})
          }
          : team.name === losers.name ? {
            ...team,
              lost: team.lost + 1,
              goalsScored: team.goalsScored + losers.goals,
              goalsAgainst: team.goalsAgainst + winners.goals,
              matches: [].concat(team.matches).concat({opposition: winners.name, goalsScored: losers.goals, goalsAgainst: winners.goals})
          } : team )
      }
      else {
        return state.map(team => team.name === result.home.name
          ?
          { ...team,
            points: team.points + 1,
            drawn: team.drawn + 1,
            goalsScored: team.goalsScored + home.goals,
            goalsAgainst: team.goalsAgainst + away.goals,
            matches: [].concat(team.matches).concat({opposition: away.name, goalsScored: home.goals, goalsAgainst: home.goals})
          }
          : team.name === result.away.name ? {
            ...team,
              points: team.points + 1,
              drawn: team.drawn + 1,
              goalsScored: team.goalsScored + away.goals,
              goalsAgainst: team.goalsAgainst + home.goals,
              matches: [].concat(team.matches).concat({opposition: home.name, goalsScored: home.goals, goalsAgainst: home.goals})
          } : team )
      }
    }
    case 'TEAMS_FETCH_SUCCEEDED': {
      const teams = [].concat(action.teams)
      return teams;
    }
    default:
      return state;
  }
}
