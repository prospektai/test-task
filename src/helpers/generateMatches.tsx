import { MatchScore, StateModel } from "../types";

const generateMatches = (origState: StateModel): MatchScore[] => {

    let matches: MatchScore[] = [];

    let state = {...origState};

    // Matches every team with every other team without duplicate matches
    for (let i = 0; i < state.teams.length; i++) {
        for (let j = i; j < state.teams.length; j++) {

            if (state.teams[i].name !== state.teams[j].name) {
                let match = new MatchScore();

                match.firstTeam = { 
                    team: state.teams[i],
                    score: 0
                };

                match.secondTeam = { 
                    team: state.teams[j], 
                    score: 0
                };
                
                matches.push(match);
            }
        }
    }

    return matches;
}

export default generateMatches;