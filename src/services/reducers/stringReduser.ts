import { SET_STRING_CIRCLES_ACTION, TStringActions } from "../actions/stringActions";
import { CircleProps } from "../../components/ui/circle/circle";

export type TStringPageStateType = {
    stringCirclesPropsList: Array<CircleProps>;
};


const stringPageState: TStringPageStateType = {
    stringCirclesPropsList:[]
};

export const stringReducer = (state = stringPageState, action: TStringActions): TStringPageStateType => {
    switch (action.type) {
        case SET_STRING_CIRCLES_ACTION: {
            console.log("stringReducer");
            console.log(action.data);
            console.log(new Date().getTime());
            return { ...state, stringCirclesPropsList: action.data };
        }
        default: {
            return state;
        }
    }
};
