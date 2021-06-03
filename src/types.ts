import {immerable} from "immer";

export class Team {
    id: number = 0;
    place: number = 1;
    name: string = "default";
    played: number = 0;
    win: number = 0;
    draw: number = 0;
    lost: number = 0;
    points: number = 0;
}

export class MatchScore {

    // MatchScore(args: {firstTeam: {team: Team, score: number}, secondTeam: {team: Team, score: number}}){
    //     this.firstTeam = args.firstTeam;
    //     this.secondTeam = args.secondTeam;
    // }

    firstTeam!: {
        team: Team, 
        score: number
    };

    secondTeam!: {
        team: Team, 
        score: number
    };

    isSubmitted: boolean = false;
}

export class StateModel {

    [immerable] = true;

    teams: Team[] = [];
    matches: MatchScore[] = [];
}