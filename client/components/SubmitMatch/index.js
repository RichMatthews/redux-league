import React from 'react';
import './index.scss'

const submitMatch = ({ handleTeamName, handleGoals, teams }) => (
  <div>
    <h3>Match</h3>
    <div className="matchInput">
        <div className="home">
          <input
            className="teamInput"
            name="home"
            onChange={handleTeamName}
            placeholder='Enter home team'
          />
          <input
            className="goalsInput"
            name="home"
            onChange={handleGoals}
          />
        </div>
        <div className="away">
          <input
            className="goalsInput"
            name="away"
            onChange={handleGoals}
          />
          <input
            className="teamInput"
            name="away"
            onChange={handleTeamName}
            placeholder='Enter away team'
          />
        </div>
    </div>
  </div>
);

export default submitMatch;
