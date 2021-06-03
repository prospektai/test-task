import { useState } from "react";
import { useSelector, useStore } from "react-redux";
import { updatePoints } from "../redux/storeSlice";
import { MatchScore, StateModel } from "../types";

const MatchComponent = (element: MatchScore) => {

    let el: MatchScore = element
    const store = useStore();
    const state: StateModel = useStore().getState() as StateModel;

    const [firstTeamScore, setFirstTeamScore] = useState(el?.firstTeam?.score ?? null);
    const [secondTeamScore, setSecondTeamScore] = useState(el?.secondTeam?.score ?? null);
    const [isSubmitted, setIsSubmitted] = useState(el?.isSubmitted ?? false);

    const updateScores = () => {

        let origMatchIndex = state.matches.findIndex((elem: MatchScore) =>
            elem.firstTeam === el.firstTeam && elem.secondTeam === el.secondTeam);

        let origMatch = state.matches[origMatchIndex];

        let firstTeamIndex = state.teams.findIndex(el => origMatch.firstTeam.team === el);
        let secondTeamIndex = state.teams.findIndex(el => origMatch.secondTeam.team === el);

        let newMatch: MatchScore = {
            firstTeam: {
                team: el.firstTeam.team,
                score: firstTeamScore
            },
            secondTeam: {
                team: el.secondTeam.team,
                score: secondTeamScore
            },
            isSubmitted: true
        };

        store.dispatch(updatePoints({
            origMatchIndex, newMatch, firstTeamIndex, secondTeamIndex
        }));
        setIsSubmitted(true);
    }

    const handleKeyPress = (e: any) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            updateScores();
        }
    }

    let toReturn: any;

    if (!isSubmitted) {
        toReturn = (
            <tr>
                <td> {el.firstTeam?.team?.name} </td>
                <td> <input className="score-input" type="number" value={firstTeamScore} onInput={
                    (e: any) => setFirstTeamScore(e.target.value as number)
                } onKeyPress={handleKeyPress} /> </td>
                <td> <b> : </b> </td>
                <td> <input className="score-input" type="number" value={secondTeamScore}
                    onInput={
                        (e: any) => setSecondTeamScore(e.target.value as number)
                    }
                    onKeyPress={handleKeyPress}
                /> </td>
                <td> {el.secondTeam?.team?.name} </td>
            </tr>
        );
    } else if (isSubmitted) {
        toReturn = (
            <tr>
                <td> {el.firstTeam?.team?.name} </td>
                <td> <b> {firstTeamScore} </b> </td>
                <td> <b> : </b> </td>
                <td> <b> {secondTeamScore} </b> </td>
                <td> {el.secondTeam?.team?.name} </td>
            </tr>
        );
    }

    return toReturn;
}

const Matches = () => {

    const matchState: MatchScore[] = useSelector((state: any) => state.matches);

    return (
        <tbody>
            {matchState.map((element: MatchScore) => {
                return <MatchComponent {...element} />
            })}
        </tbody>
    );

}

export default Matches;