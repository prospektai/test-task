import {immerable} from "immer";

export class Team {
    // id: number = 0;
    place: number = 1;
    name: string = "default";
    played: number = 0;
    win: number = 0;
    draw: number = 0;
    lost: number = 0;
    points: number = ( this.win * 3 ) + ( this.draw )
}

export class MatchScore {

    MatchScore(args: {firstTeam: any, secondTeam: any}){
        this.firstTeam = args.firstTeam;
        this.secondTeam = args.secondTeam;
    }

    firstTeam: {
        team: Team,
        score: number
    } | undefined;
    secondTeam: {
        team: Team,
        score: number
    } | undefined;
}

export class StateModel {

    [immerable] = true;

    StateModel(args: {teams: any, matches: any}){
        this.teams = args?.teams;
        this.matches = args?.matches;
    }

    teams: Array<Team> = [];
    matches: Array<MatchScore> = [];
}