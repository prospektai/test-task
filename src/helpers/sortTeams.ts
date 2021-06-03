import { StateModel, Team } from "../types";

const sortTeams = (state: StateModel) => {
    let sortedTeams: Team[] =  [...state.teams].sort((a: Team, b: Team): number => { 

        let comp: number = 0;

        if(a.points > b.points){
            comp = -1;
        }else if(a.points < b.points){
            comp = 1;
        }

        return comp;
    });

    sortedTeams.forEach((team: Team, i: number) => {
        team.place = i + 1;
    });

    return sortedTeams;

}

export default sortTeams;