import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import { Main } from './index';
import sinon from 'sinon';
import SubmitMatch from '../SubmitMatch';

describe('Main Component', () => {
  let wrapper;
  const teamsStub = [];
  const matchesStub = [
    {awayGoals: 1, awayTeam: "Man City", homeGoals: 1, homeTeam: "Arsenal", month: "February"},
    {awayGoals: 2, awayTeam: "Man City", homeGoals: 3, homeTeam: "Chelsea", month: "February"},
    {awayGoals: 0, awayTeam: "Chelsea", homeGoals: 0, homeTeam: "Man Utd", month: "February"}
  ];
  const submitMatchStub = sinon.spy();
  const syncFirebaseToStoreStub = sinon.spy();
  beforeEach(() => {
    wrapper = mount(
      <Main
        teams={teamsStub}
        matches={matchesStub}
        submitMatch={submitMatchStub}
        syncFirebaseToStore={syncFirebaseToStoreStub}
      />
    )
  });
  describe('components', () => {
    test('renders a submit match component', () => {
      expect(wrapper.find(SubmitMatch).length).to.equal(1);
    })
  })
  describe('titles', () => {
    test('renders a h3 title with the correct text', () => {
      expect(wrapper.find('h3').at(0).text()).to.equal('Match');
    });
  })
  describe('inputs', () => {
    test('renders two team inputs', () => {
      expect(wrapper.find('.teamInput').length).to.equal(2);
    });
    test('renders two goals inputs', () => {
      expect(wrapper.find('.goalsInput').length).to.equal(2);
    });
    test('expects syncFirebaseToStoreStub to have been called', () => {
      expect(syncFirebaseToStoreStub.called).to.equal(true)
    });

    test('sets team name value in state on change', () => {
      const homeInput = wrapper.find('.teamInput').at(0)
      const updatedHomeTeam = 'Manchester United';
      homeInput.simulate('change', {
        target: { name: 'home', value: updatedHomeTeam}
      });
      expect(wrapper.state().home.name).to.equal(updatedHomeTeam)
    });

    test('sets away name value in state on change', () => {
      const awayTeamInput = wrapper.find('.teamInput').at(1)
      const updatedAwayTeam = 'Arsenal';
      awayTeamInput.simulate('change', {
        target: { name: 'away', value: updatedAwayTeam}
      });
      expect(wrapper.state().away.name).to.equal(updatedAwayTeam)
    });

    test('sets home goals value in state on change', () => {
      const homeInput = wrapper.find('.goalsInput').at(0);
      const homeGoals = 3;
      homeInput.simulate('change', {
        target: { name: 'home', value: homeGoals}
      });
      expect(wrapper.state().home.goals).to.equal(homeGoals)
    });

    test('sets away goals value in state on change', () => {
      const awayInput = wrapper.find('.goalsInput').at(1);
      const awayGoals = 1;
      awayInput.simulate('change', {
        target: { name: 'away', value: awayGoals}
      });
      expect(wrapper.state().away.goals).to.equal(awayGoals)
    });
  });

  describe('toggling', () => {
    test('expects the table to been shown initially', () => {
      expect(wrapper.find('.leagueTable').length).to.equal(1);
    });
    test('expects toggleTable to have been called', () => {
      wrapper.instance().toggleTable();
      expect(wrapper.find('.leagueTable').length).to.equal(0);
    });
    test('expects toggleTable to have been called', () => {
      wrapper.instance().toggleTable();
      expect(wrapper.find('.matchesComponent').length).to.equal(1);
    });
  });
  describe('buttons', () => {
    test('expects submitMatch to not have been called on click', () => {
      const submitMatchBtn = wrapper.find('.submitMatchBtn');
      submitMatchBtn.simulate('click');
      expect(submitMatchStub.called).to.equal(false)
    });
    test('expects submitMatch to not have been called on click when teams entered', () => {
      const submitMatchBtn = wrapper.find('.submitMatchBtn');
      const homeInput = wrapper.find('.teamInput').at(0);
      wrapper.setState({validInputs: true});
      submitMatchBtn.simulate('click');
      expect(submitMatchStub.called).to.equal(true);
    });
  });
  describe('other functions', () => {
    test('expects the matches array to have been filtered and return the amount of matches Chelsea have been in', () => {
      const teamToFilterBy = {name: 'Chelsea'};
      expect(wrapper.instance().findMatchesForTeam(teamToFilterBy).length).to.equal(2);
    });
    test('expects the matches array to have been filtered and return the amount of matches Chelsea have been in at home', () => {
      const teamToFilterBy = {name: 'Chelsea'};
      const venue = 'home';
      expect(wrapper.instance().findMatchesForTeam(teamToFilterBy, venue).length).to.equal(1);
    });
  });
});
