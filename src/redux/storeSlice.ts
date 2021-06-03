import { createSlice } from "@reduxjs/toolkit";
import generateMatches from "../helpers/generateMatches";
import { loadState, removeState, saveState } from "../services/localStorage";
import sortTeams from "../helpers/sortTeams";
import { MatchScore, StateModel, Team } from "../types";

// Tries to load the saved store, and initializes
// an empty store if unsuccessful
const initialState = loadState() ?? new StateModel();

export const storeSlice = createSlice({
    name: 'store',
    initialState: initialState,
    reducers: {
        addTeam: (state: StateModel, args: any): void => {

            let newTeam: Team = new Team();

            newTeam.name = args.payload;

            state.teams = [...state.teams, newTeam];
            state.teams = sortTeams(state);

            // Add new match only if there's someone to play against
            if (state.teams.length > 1) {

                state.matches = generateMatches(state);

                // Save current state to local storage
                saveState(state);
            }
        },

        updatePoints: (state: StateModel, args: any): void => {

            let origMatchIndex: number = args.payload.origMatchIndex;
            let firstTeamIndex: number = args.payload.firstTeamIndex;
            let secondTeamIndex: number = args.payload.secondTeamIndex;
            let newMatch: MatchScore = {...args.payload.newMatch};

            state.matches[origMatchIndex] = newMatch;

            let newFirstTeam: Team = newMatch.firstTeam.team;
            let newSecondTeam: Team = newMatch.secondTeam.team;

            let firstTeamScore: number = newMatch.firstTeam.score as number;
            let secondTeamScore: number = newMatch.secondTeam.score as number;

            // Calculate and set results
            if (+firstTeamScore > +secondTeamScore) {
                newFirstTeam.win += 1;
                newFirstTeam.points += 3;

                newSecondTeam.lost += 1;
            } else if (+firstTeamScore < +secondTeamScore) {
                newSecondTeam.win += 1;
                newSecondTeam.points += 3;

                newFirstTeam.lost += 1;
            } else if (+firstTeamScore === +secondTeamScore) {
                newFirstTeam.draw += 1;
                newFirstTeam.points += 1;

                newSecondTeam.draw += 1;
                newSecondTeam.points += 1;
            }

            newFirstTeam.played += 1;
            newSecondTeam.played += 1;

            state.teams[firstTeamIndex] = newFirstTeam;
            state.teams[secondTeamIndex] = newSecondTeam;

            state.teams = sortTeams(state);

            saveState(state);
        },

        deleteState: (state: StateModel) => {
            removeState();
            return new StateModel();
        }
    }
})

export const { addTeam, updatePoints, deleteState } = storeSlice.actions

export default storeSlice.reducer