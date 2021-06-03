import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Matches from './components/matches';
import store from './redux/store';
import { addTeam, deleteState } from './redux/storeSlice';
import { StateModel, Team } from './types';

function App() {

  const [teamName, setTeamName] = useState("");

  const teamsState: Team[] = useSelector((state: StateModel) => state.teams);

  return (
    <div className="App">

      <div className="inputs">
        <input type="text" placeholder="New team" onInput={(e: any) => { setTeamName(e.target?.value) }} />

        <button onClick={() => {
          store.dispatch(addTeam(teamName));
        }}>Add</button>

        <button onClick={() => store.dispatch( deleteState() )} >
          Delete state
        </button>

      </div>

      <div className="tables">
        <table className="teams" cellPadding="10">
          <thead>
            <tr style={{
              fontWeight: "bolder",
              backgroundColor: "lightgray"
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
            <Matches />
        </table>
      </div>
    </div>
  );
}

export default App;