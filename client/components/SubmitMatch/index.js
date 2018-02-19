import React from 'react';
import { Dropdown, Input } from 'semantic-ui-react';

const submitMatch = ({ handleName, handleGoals, teams }) => (
  <div className="matchInput">
    <h3>Match</h3>
      <Dropdown
        className="teamInput"
        onChange={(e) => handleName('home')(e.target.innerText)}
        placeholder='Select home team'
        search
        selection
        options={teams}
      />
      <Input
        className="goalsInput"
        onChange={(e) => handleGoals('home')(Number(e.target.value))}
      />
      <Input
        className="goalsInput"
        onChange={(e) => handleGoals('away')(Number(e.target.value))}
      />
      <Dropdown
        className="teamInput"
        onChange={(e) => handleName('away')(e.target.innerText)}
        placeholder='Select away team'
        search
        selection
        options={teams}
      />
  </div>
);

export default submitMatch;
