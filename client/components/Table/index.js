import React from 'react';
import { Table } from 'semantic-ui-react';

const LeagueTable = ({ teams }) => (
  <table className="ui striped table">
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
         <td className="stats">{team.won + team.lost + team.drawn}</td>
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
);

export default LeagueTable;
