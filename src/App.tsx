import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import store from './redux/store';
import { addTeam } from './redux/storeSlice';
import { MatchScore, StateModel } from './types';

function App() {

  const [teamName, setTeamName] = useState("");

  const teamsState = useSelector((state: StateModel) => state.teams);
  const matchState = useSelector((state: StateModel) => state.matches);

  return (
    <div className="App">

      <input type="text" placeholder="New team" onInput={(e: any) => { setTeamName(e.target.value) }} />

      <button onClick={() => {
        store.dispatch(addTeam(teamName));
        console.log(store.getState());
      }}>Add</button>

      <table className="teams" cellPadding="10">
        <thead>
          <tr style={{
            fontWeight: "bolder"
          }}>
            <td>Place</td>
            <td>Team</td>
            <td>Played</td>
            <td>Win</td>
            <td>Draw</td>
            <td>Lost</td>
            <td>Points</td>
          </tr>
        </thead>

        <tbody className="teams-body">
          {
            teamsState.length > 0 ?
              teamsState.map((e) => {
                return (
                  <tr key={e.name}>
                    <td>{e.place}</td>
                    <td>{e.name}</td>
                    <td>{e.played}</td>
                    <td>{e.win}</td>
                    <td>{e.draw}</td>
                    <td>{e.lost}</td>
                    <td>{e.points}</td>
                  </tr>
                );
              })
              :
              <tr></tr>
          }
        </tbody>
      </table>

      <table className="matches" cellPadding="10">
        <tbody>
          {
            matchState.map((e: MatchScore) => {
              return (
                <tr>
                  <td> {e.firstTeam?.team.name} </td>
                  <td> <input className="score-input" type="number" placeholder="0" /> </td>
                  <td> <b> : </b> </td>
                  <td> <input className="score-input" type="number" placeholder="0" /> </td>
                  <td> {e.secondTeam?.team.name} </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
