import { CircleProps } from "../../components/ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { AppDispatch, RootState } from "../storage/index";


//export const SOME_ACTION = "SOME_ACTION";
export const SET_STRING_CIRCLES_ACTION = "SET_STRING_CIRCLES_ACTION";

export interface ISetStringCirlesDataAction {
    readonly type: typeof SET_STRING_CIRCLES_ACTION;
    data: Array<CircleProps>
}

export type TStringActions = /*IDoSomeAction|*/ ISetStringCirlesDataAction;


export const setStringCirlesDataAction = (data: Array<CircleProps>): ISetStringCirlesDataAction => ({
    type: SET_STRING_CIRCLES_ACTION,
    data
});
//export function reverseStep(stringCircles: Array<CircleProps>, index: number) {
//    return function (dispatch: AppDispatch, getState: () => RootState) {
//        const endIndex = stringCircles.length;
//        const mid = Math.floor(stringCircles.length / 2);

//        if (stringCircles.length - 1 - index === index) {
//            console.log("start");
//            console.log(index);
//            console.log("end");
//            console.log(stringCircles.length - 1 - index);
//            stringCircles[index].state = ElementStates.Modified;
//            dispatch(setStringCirlesDataAction(stringCircles));
//        }
//        else {
//            stringCircles[index].state = ElementStates.Changing;
//            stringCircles[stringCircles.length - 1 - index].state = ElementStates.Changing;
//            dispatch(setStringCirlesDataAction(stringCircles));

//            //await new Promise(f => setTimeout(f, 1000));

//            console.log("ss");
//            console.log(index);
//            console.log(stringCircles);
//            console.log(new Date().getTime());
//            setTimeout(() => {
//                console.log("setTimeout");
//                console.log(index);
//                console.log(stringCircles);
//                console.log(new Date().getTime());
//                stringCircles[index].state = ElementStates.Modified;
//                stringCircles[stringCircles.length - 1 - index].state = ElementStates.Modified;
//                const temp = stringCircles[index];
//                stringCircles[index] = stringCircles[stringCircles.length - 1 - index];
//                stringCircles[stringCircles.length - 1 - index] = temp;
//                dispatch(setStringCirlesDataAction(stringCircles));
//                //reverseStep(dispatch, stringCircles, index );
//            }, 1000);
//        }

//    };
//}
export function animateStringReverseAction(strToReverse:string) {
    return function (dispatch: AppDispatch, getState: () => RootState) {
        const charArrayToReverse = strToReverse.split('');
        const circleStates: Array<CircleProps> = [];
        //if (charArrayToReverse.length <= 1) {

        //}
        //else {
        //    const mid = Math.floor(charArrayToReverse.length / 2);
        //    for (let i = 0; i <= mid; i++) {

        //    }
        //}
        for (let i = 0; i < charArrayToReverse.length; i++) {
            const newCircleState: CircleProps = {
                letter: charArrayToReverse[i]
            };
            circleStates.push(newCircleState)
        }
        //console.log("before");
        //console.log(circleStates);
        //console.log(new Date().getTime());
        reverseStep(dispatch, circleStates,0);
        
    };
}

//function reverseStep(dispatch: AppDispatch, stringCircles: Array<CircleProps>) {
//    //dispatch(setStringCirlesDataAction);

//    const endIndex = stringCircles.length;
//    const mid = Math.floor(stringCircles.length / 2);

//    for (let index = 0; index <= mid; index++) {

//        if (stringCircles.length - 1 - index === index) {
//            console.log("start");
//            console.log(index);
//            console.log("end");
//            console.log(stringCircles.length - 1 - index);
//            stringCircles[index].state = ElementStates.Modified;
//            dispatch(setStringCirlesDataAction(stringCircles));
//        }
//        else {
//            stringCircles[index].state = ElementStates.Changing;
//            stringCircles[stringCircles.length - 1 - index].state = ElementStates.Changing;
//            dispatch(setStringCirlesDataAction(stringCircles));

//            //await new Promise(f => setTimeout(f, 1000));

//            console.log("ss");
//            console.log(index);
//            console.log(stringCircles);
//            console.log(new Date().getTime());
//            setTimeout(() => {
//                console.log("setTimeout");
//                console.log(index);
//                console.log(stringCircles);
//                //stringCircles[index].state = ElementStates.Modified;
//                //stringCircles[stringCircles.length - 1 - index].state = ElementStates.Modified;
//                //const temp = stringCircles[index];
//                //stringCircles[index] = stringCircles[stringCircles.length - 1 - index];
//                //stringCircles[stringCircles.length - 1 - index] = temp;
//                //dispatch(setStringCirlesDataAction(stringCircles));
//            }, 10000);
//            //reverseStep(dispatch, stringCircles, index + 1);
//        }
//    }
//}


function reverseStep(dispatch: AppDispatch, stringCircles: Array<CircleProps>, index:number) {
    //dispatch(setStringCirlesDataAction);

    const endIndex = stringCircles.length;
    const mid = Math.floor(stringCircles.length / 2);

    if (stringCircles.length - 1 - index === index) {
        //console.log("start");
        //console.log(index);
        //console.log("end");
        //console.log(stringCircles.length - 1 - index);
        stringCircles[index].state = ElementStates.Modified;
        dispatch(setStringCirlesDataAction(stringCircles));
    }
    else {
        stringCircles[index].state = ElementStates.Changing;
        stringCircles[stringCircles.length - 1 - index].state = ElementStates.Changing;
        dispatch(setStringCirlesDataAction(stringCircles));

        //await new Promise(f => setTimeout(f, 1000));

        //console.log("st");
        //console.log(index);
        //console.log(stringCircles);
        //console.log(new Date().getTime());
        setTimeout(function () {
            //console.log("setTimeout");
            //console.log(index);
            //console.log(stringCircles);
            //console.log(new Date().getTime());
            stringCircles[index].state = ElementStates.Modified;
            stringCircles[stringCircles.length - 1 - index].state = ElementStates.Modified;
            const temp = stringCircles[index];
            stringCircles[index] = stringCircles[stringCircles.length - 1 - index];
            stringCircles[stringCircles.length - 1 - index] = temp;
            dispatch(setStringCirlesDataAction(stringCircles));
            reverseStep(dispatch, stringCircles, index + 1);
        }, 1000);
    }
}