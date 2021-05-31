import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import store from './redux/store';
import { addTeam } from './redux/storeSlice';
import { StateModel } from './types';

function App() {

  const [teamName, setTeamName] = useState("");

  const teamsState = useSelector((state: StateModel) => state.teams);

  return (
    <div className="App">

      <input type="text" placeholder="New team" onInput={(e: any) => { setTeamName(e.target.value) }}/>

      <button onClick={() => {
        store.dispatch(addTeam( teamName ));
        console.log(store.getState());
      }}>Add</button>

      <table className="teams">
        <thead>
          <tr>
            <td>Place</td>
            <td>Team</td>
            <td>Played</td>
            <td>Win</td>
            <td>Draw</td>
            <td>Lost</td>
            <td>Points</td>
          </tr>
        </thead>

        <tbody>
          {
            teamsState.length > 0 ?
            teamsState.map((e) => {
              return(
                <tr>
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
        <tr>

        </tr>
      </table>

      <table className="team-scores">
        <tbody>
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
