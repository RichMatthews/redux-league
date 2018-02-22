import React from 'react';

const Matches = ({ handleInput }) => (
  <div className="matchesComponent">
    <h3>Latest Matches</h3>
    <input
      onChange={handleInput}
      name="chosenTeam"
      placeholder='Select team to view matches'
    />
    <input
      onChange={handleInput}
      name="chosenVenue"
      placeholder='Home or Away'
    />
  </div>
);

export default Matches;
