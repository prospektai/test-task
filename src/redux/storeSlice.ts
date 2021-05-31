import { createSlice } from "@reduxjs/toolkit";
import { MatchScore, StateModel, Team } from "../types";

export const storeSlice = createSlice({
    name: 'store',
    initialState: new StateModel(),
    reducers: {
        addTeam: (state: StateModel, args: any) => {
            let newTeam = new Team();

            newTeam.name = args.payload;

            state.teams = [...state.teams, newTeam];

            // Add new match only if there's someone to play against
            if(state.teams.length > 1){
                let newMatch = new MatchScore();

                state.matches = [...state.matches, newMatch];
            }
        }
    }
})

export const { addTeam } = storeSlice.actions

export default storeSlice.reducer