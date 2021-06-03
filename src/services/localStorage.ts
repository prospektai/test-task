import { StateModel } from "../types";

const saveState = (state: StateModel): void => {
    let data = JSON.stringify(state);

    console.log(state);

    localStorage.setItem("savedState", data);
}

const loadState = (): StateModel | null => {
    let data = localStorage.getItem("savedState");

    if(data){
        console.log(JSON.parse(data));
        return JSON.parse(data);
    }else{
        return null;
    }
}

const removeState = (): void => {
    localStorage.removeItem("savedState");
}

export {saveState, loadState, removeState};