import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const Matches = ({ handleInput, venueOptions, teams }) => (
  <div>
    <h3>Latest Matches</h3>
    <Dropdown
      onChange={(e) => (handleInput('chosenTeam')(e.target.innerText))}
      placeholder='Select team to view matches'
      search
      selection
      options={teams}
    />
    <Dropdown
      onChange={(e) => (handleInput('chosenVenue')(e.target.innerText))}
      placeholder='Home or Away'
      search
      selection
      options={venueOptions}
    />
    <Dropdown
      onChange={(e) => (handleInput('chosenVenue')(e.target.innerText))}
      placeholder='Month'
      search
      selection
      options={venueOptions}
    />
  </div>
);

export default Matches;
