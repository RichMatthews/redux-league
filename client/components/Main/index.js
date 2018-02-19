import React from 'react';
import { connect } from 'react-redux';
import {
  updateTable,
  syncFirebaseToStore,
  syncStoreToFirebase,
  postMatchToFirebase
 } from '../../redux/actions';
 import { Dropdown, Input, Button } from 'semantic-ui-react';
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
    chosenVenue: ''
  }

  componentDidMount = () => {
    this.props.syncFirebaseToStore()
  }

  handleInput = (name) => (value) => {
   const prevState = this.state[name]
   this.setState({ [name]: value })
  }

  handleName = (name) => (value) => {
   const prevState = this.state[name]
   this.setState({ [name]: {...prevState, name: value } })
  }

  handleGoals = (name) => (value) => {
   const prevState = this.state[name]
   this.setState({ [name]: {...prevState, goals: value } })
  }

  enableButton = () => {
    const { buttonDisabled, home } = this.state;
    return this.setState({buttonDisabled: false})
  }

  toggleTable = () => {
    this.setState(prevState => ({showLeagueTable: !prevState.showLeagueTable}))
    this.toggleView()
  }

  toggleView = () => {
    if (this.state.showLeagueTable === true) { this.setState({ buttonName: 'show table' }) }
    else { this.setState({buttonName: 'show matches'}) }
  }

  findTeam = (team, venue) => {
    if (team && venue === 'home') {
      return this.filterByTeam(team, 'homeTeam')
    }
    else if (team && venue === 'away') {
      return this.filterByTeam(team, 'awayTeam')
    }
    else if (team) {
      return this.props.matches.filter(t => t.homeTeam === team.name || t.awayTeam === team.name)
      .map((match) => (
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

  render() {
    const { teams, matches, submitMatch } = this.props;
    const { home, away, chosenTeam, buttonDisabled, showLeagueTable, buttonName, venueOptions, chosenVenue } = this.state;
    let teamToFind = teams.find(team => team.name === this.state.chosenTeam);
    return(
      <div className="container">
        <SubmitMatch
          handleName={this.handleName}
          handleGoals={this.handleGoals}
          teams={teams}
        />
        <Button
          onClick={() => submitMatch(home, away, teams)}
          disabled={false}
          onChange={this.enableButton}
        >
          Submit
        </Button>
      <div className="tableOrMatches">
        <button onClick={this.toggleTable}>{buttonName}</button>
        {showLeagueTable ?
          <div className="tableOrMatches--children">
            <h3> League Table </h3>
            <Table
              teams={teams}
            />
          </div>
          :
          <div className="tableOrMatches--children">
            <Matches
              teams={teams}
              venueOptions={venueOptions}
              handleInput={this.handleInput}
            />
            {this.findTeam(teamToFind, chosenVenue)}
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
