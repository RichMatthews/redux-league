import React from 'react';
import { connect } from 'react-redux';
import {
  updateTable,
  syncFirebaseToStore,
  syncStoreToFirebase,
  postMatchToFirebase
 } from '../../redux/actions';
 import Button from '../Button'
 import Table from '../Table'
 import Matches from '../Matches'
 import SubmitMatch from '../SubmitMatch'
 import firebase from 'firebase';
 import '../../../Firebase/config.js';
import './index.scss';

export class Main extends React.Component {

  state = {
    home: {
      name: '',
      goals: 0
    },
    away: {
      name: '',
      goals: 0
    },
    buttonDisabled: true,
    showLeagueTable: true,
    buttonName: 'show matches',
    venueOptions: [{
        value: 'home',
        text: 'home',
      },
      {
        value: 'away',
        text: 'away',
      }
    ],
    chosenTeam: '',
    chosenVenue: '',
    chosenMonth: '',
    validInputs: false
  }

  componentDidMount = () => {
    this.props.syncFirebaseToStore()
  }

  handleInput = e => {
   const { name, value } = e.target;
   this.setState({ [name]: value })
  }

  handleTeamName = e => {
   this.form()
   const { name, value } = e.target;
   if (value.length > 0) {
     this.setState({validInputs: true})
   }
   else {
     this.setState({validInputs: false})
   }
   const prevState = this.state[name]
   this.setState({ [name]: {...prevState, name: value } })
  }

  handleGoals = e => {
   const { name, value } = e.target;
   const prevState = this.state[name]
   this.setState({ [name]: {...prevState, goals: Number(value) } })
  }

  enableButton = () => {
    const { buttonDisabled, home } = this.state;
    return this.setState({buttonDisabled: false})
  }

  toggleTable = () => {
    this.setState(prevState => ({showLeagueTable: !prevState.showLeagueTable}))
    this.toggleView();
  }

  toggleView = () => {
    if (this.state.showLeagueTable === true) { this.setState({ buttonName: 'show table' }) }
    else { this.setState({buttonName: 'show matches'}) }
  }

  findMatchesForTeam = (team, venue) => {
    if (team && venue) {
      return this.filterByTeam(team, `${venue}Team`)
    }
    else if (team) {
      return this.props.matches.filter(t => t.homeTeam === team.name || t.awayTeam === team.name)
      .map((match) => (
        this.result(match)
      ))
    }
    else {
      return this.props.matches.map((match) => (
        this.result(match)
      ))
    }
  }

  filterByTeam = (team, teamVenue) => {
    return this.props.matches.filter(t => t[teamVenue] === team.name).map(match => this.result(match))
  }

  filterByMonth = () => {
    return this.props.matches.filter(byMonth => byMonth.month).map(match => this.result(match))
  }

  result = (match) => {
    return <div className="match">
            <span className="matchTeams"> {match.homeTeam} </span>
            <span className="matchGoals"> {match.homeGoals} </span>
            -
            <span className="matchGoals"> {match.awayGoals} </span>
            <span className="matchTeams"> {match.awayTeam} </span>
           </div>
  }

  compare = (a,b) => {
  if (a.last_nom < b.last_nom)
    return -1;
  if (a.last_nom > b.last_nom)
    return 1;
    return 0;
  }

  form = (team) => {
    let lastFiveMatches;
    return team && team.matches ?
      lastFiveMatches = Object.values(this.props.teams.find(t => t.name === team.name).matches).sort(this.compare).reverse().slice(0, 5).map((match) => {
        if(match.winner === team.name){
          return 'W ';
        }
        else if(match.winner !== team.name){
          return 'L ';
        }
        else {
          return 'D ';
        }
      })
    :
    '---'
  }

  render() {
    const { teams, matches, submitMatch, form } = this.props;
    const { home, away, chosenTeam, buttonDisabled, showLeagueTable, buttonName, venueOptions, chosenVenue, chosenMonth } = this.state;
    let teamToFind = teams.find(team => team.name === chosenTeam);
    return(
      <div className="container">
        <div className="submitMatchContainer">
          <SubmitMatch
            handleTeamName={this.handleTeamName}
            handleGoals={this.handleGoals}
            teams={teams}
          />
          <Button
            onClick={() => submitMatch(home, away, teams)}
            className="submitMatchBtn"
            text="Submit"
            disabled={!this.state.validInputs}
          >
          </Button>
        </div>
      <div className="tableOrMatches">
        <button onClick={this.toggleTable}>{buttonName}</button>
        {showLeagueTable ?
          <div className="tableOrMatches--children">
            <h3> League Table </h3>
            <Table
              teams={teams}
              form={this.form}
            />
          </div>
          :
          <div className="tableOrMatches--children">
            <Matches
              teams={teams}
              venueOptions={venueOptions}
              handleInput={this.handleInput}
            />
            {this.findMatchesForTeam(teamToFind, chosenVenue)}
          </div>
        }
      </div>
    </div>
    )
  }
};

const mapStateToProps = state => ({
  teams: state.teams,
  matches: state.matches
});

const mapDispatchToProps = (dispatch) => ({
  submitMatch: (home, away, teams) => {
    dispatch(updateTable(home, away))
    dispatch(syncStoreToFirebase(teams))
    dispatch(postMatchToFirebase(home, away))
  },
  syncFirebaseToStore: (teams) => {
    dispatch(syncFirebaseToStore(teams))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
