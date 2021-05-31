import { createSlice } from "@reduxjs/toolkit";
import { loadState, removeState, saveState } from "../helpers/localStorage";
import { MatchScore, StateModel, Team } from "../types";

// Tries to load the saved store, and initializes
// an empty store if unsuccessful
const initialState = loadState() ?? new StateModel();

export const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,
    reducers: {
        addTeam: (state: StateModel, args: any) => {
            let newTeam = new Team();

            newTeam.name = args.payload;

            state.teams = [...state.teams, newTeam];

            // Add new match only if there's someone to play against
            if(state.teams.length > 1){
                let newMatch = new MatchScore();

                newMatch.firstTeam = {
                    team: newTeam,
                    score: 0
                };

                newMatch.secondTeam = {
                    team: newTeam,
                    score: 0
                };

                state.matches = [...state.matches, newMatch];

                // Save current state to local storage
                saveState(state);
                return state;
            }
        },
        deleteState: ( state: StateModel ) => {
            removeState();
            return new StateModel();
        }
    }
})

export const { addTeam, deleteState } = storeSlice.actions

export default storeSlice.reducer