import React from 'react';
import { connect } from 'react-redux';
import {
  submitMatch,
  updateWinner,
  updateLoser
 } from '../../redux/actions';
// import './index.scss';

export class Main extends React.Component {

  state = {
    home: {
      name: '',
      goals: 0
    },
    away: {
      name: '',
      goals: 0
    }
  }

  handleHomeInput = (e) => {
    let stateCopy = { ...this.state }
    stateCopy.home.name = e.target.value
    this.setState(stateCopy);
  };

  handleAwayInput = (e) => {
    let stateCopy = { ...this.state }
    stateCopy.away.name = e.target.value
    this.setState(stateCopy);
  };

  handleHomeGoals = (e) => {
    let stateCopy = { ...this.state }
    stateCopy.home.goals = Number(e.target.value)
    this.setState(stateCopy);
  };

  handleAwayGoals = (e) => {
    let stateCopy = { ...this.state }
    stateCopy.away.goals = Number(e.target.value)
    this.setState(stateCopy);
  };

  render() {
    const { teams, submitMatch } = this.props;
    const { home, away, homeGoals, awayGoals } = this.state;
    return(
      <div>
        <h3> Match </h3>
        Home: <input onChange={this.handleHomeInput} />
        <input onChange={this.handleHomeGoals} />
        Away: <input onChange={this.handleAwayInput} />
        <input onChange={this.handleAwayGoals} />
        <button onClick={() => submitMatch(home, away, homeGoals, awayGoals)}>Submit</button>
        <h3> League Table </h3>
        <table>
          <thead>
            <tr>
              <th>Position</th>
              <th>Name</th>
              <th>P</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>F</th>
              <th>A</th>
              <th>GD</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
          {teams.sort((a, b) => (
              (b.points) - (a.points)
          )).map((team, index) => (
            <tr className="table-rows">
             <td className="stats">{index + 1}</td>
             <td className="stats">{team.name}</td>
             <td className="stats">{team.won + team.lost}</td>
             <td className="stats">{team.won}</td>
             <td className="stats">{team.drawn}</td>
             <td className="stats">{team.lost}</td>
             <td className="stats">{team.goalsScored}</td>
             <td className="stats">{team.goalsAgainst}</td>
             <td className="stats">{team.goalsScored - team.goalsAgainst}</td>
             <td className="stats">{team.points}</td>
           </tr>
         ))}
          </tbody>
         </table>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  teams: state.teams
});

const mapDispatchToProps = dispatch => ({
  submitMatch: (home, away) => {
    dispatch(updateWinner(home, away))
    dispatch(updateLoser(home, away))
  },
  updateWinner: (home, away) => {
    dispatch(updateWinner(home, away))
  },
  updateLoser: (home, away) => {
    dispatch(updateLoser(home, away))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
