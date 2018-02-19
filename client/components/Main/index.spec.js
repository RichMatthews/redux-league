import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Main } from './index';
import sinon from 'sinon';

describe('Main Component', () => {
  let wrapper;
  const teamsStub = [];
  const matchesStub = [];
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
  })
  describe('titles', () => {
    it('renders a h3 title with the correct text', () => {
      expect(wrapper.find('h3').at(0).text()).to.equal('Match');
    });
  })
  describe('inputs', () => {
    it('renders two team inputs', () => {
      expect(wrapper.find('.teamInput').length).to.equal(2);
    });
    it('renders two goals inputs', () => {
      expect(wrapper.find('.goalsInput').length).to.equal(2);
    });
    it('expects handleName to have been called on change', () => {
      wrapper.find('.teamInput').at(0).simulate('change');
      console.log(wrapper.instance().asasfasfa(), 'wrap');
      expect(wrapper.instance().handleName().called).to.equal(true);
    });
    it('expects syncFirebaseToStoreStub to have been called', () => {
      expect(syncFirebaseToStoreStub.called).to.equal(true)
    })
    xit('expects handleGoals to have been called on change', () => {

    });
  });
  describe('buttons', () => {
    xit('expects submitMatch to have been called on click', () => {

    });
  });
});
