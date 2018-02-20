import React from 'react';
import './index.scss';

const LeagueTable = ({ teams, form }) => (
  <table className="leagueTable">
    <thead>
      <tr className="tableRow">
        <th>#</th>
        <th>Name</th>
        <th>P</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th>F</th>
        <th>A</th>
        <th>GD</th>
        <th>Pts</th>
        <th>Form</th>
      </tr>
    </thead>
    <tbody>
      {teams.sort((a, b) => (
          (b.points) - (a.points)
      )).map((team, index) => (
        <tr key={index} className="tableRow">
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
         <td className="stats">{form(team)}</td>
       </tr>
     ))}
    </tbody>
 </table>
);
// Why is line 36 this not allowing re render
export default LeagueTable;
