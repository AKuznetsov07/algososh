import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { useAppDispatch, useAppSelector } from "../../services/storage";
import { Circle, CircleProps } from "../ui/circle/circle";
import { v4 as uuidv4 } from "uuid";
import { animateStringReverseAction } from "../../services/actions/stringActions";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
    //const dispatch = useAppDispatch();

    const wait = (delay: number, ...args: any[]) => new Promise(resolve => setTimeout(resolve, delay, ...args));
    //stringCirclesPropsList: Array<CircleProps>;
    const [value, setValue] = React.useState<{ inputStr: string, stringCirclesPropsList: Array<CircleProps> }>({ inputStr: "", stringCirclesPropsList :[]});
    const circlesPropsList = useAppSelector(
        (store) => store.stringPage.stringCirclesPropsList
    );

    const handleTurnAroundClick = (event: MouseEvent<HTMLButtonElement>) => {
        //dispatch(animateStringReverseAction(value))
        const charArrayToReverse = value.inputStr.split('');
        const stringCircles: Array<CircleProps> = [];
        const endIndex = stringCircles.length;
        const mid = Math.floor(stringCircles.length / 2);
        for (let i = 0; i < charArrayToReverse.length; i++) {
            const newCircleState: CircleProps = {
                letter: charArrayToReverse[i]
            };
            stringCircles.push(newCircleState)
        }
        reverseStep(stringCircles/*, 0*/);

        //for (let index = 0; index <= mid; index++) {
        //    console.log("handleTurnAroundClick")
        //    console.log(index)
        //    dispatch(reverseStep(stringCircles, index))
        //}
    };

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, inputStr: e.target.value });
    };

    async function reverseStep(stringCircles: Array<CircleProps>/*, index: number*/) {
        //dispatch(setStringCirlesDataAction);

        const endIndex = stringCircles.length;
        const mid = Math.floor(stringCircles.length / 2);

        for (let index = 0; index <= mid; index++) {
            if (stringCircles.length - 1 - index === index) {
                //console.log(stringCircles.length - 1 - index);
                stringCircles[index].state = ElementStates.Modified;
                //dispatch(setStringCirlesDataAction(stringCircles));
                setValue({ ...value, stringCirclesPropsList: stringCircles });
            }
            else {
                stringCircles[index].state = ElementStates.Changing;
                stringCircles[stringCircles.length - 1 - index].state = ElementStates.Changing;
                //dispatch(setStringCirlesDataAction(stringCircles));
                setValue({ ...value, stringCirclesPropsList: stringCircles });

                //await new Promise(f => setTimeout(f, 1000));

                console.log(stringCircles);
                await wait(1000);
                //setTimeout(() => {
                //    stringCircles[index].state = ElementStates.Modified;
                //    stringCircles[stringCircles.length - 1 - index].state = ElementStates.Modified;
                //    const temp = stringCircles[index];
                //    stringCircles[index] = stringCircles[stringCircles.length - 1 - index];
                //    stringCircles[stringCircles.length - 1 - index] = temp;
                //    //dispatch(setStringCirlesDataAction(stringCircles));
                //    setValue({ ...value, stringCirclesPropsList: stringCircles });
                //}, 1000);
                //reverseStep(stringCircles, index + 1);
                stringCircles[index].state = ElementStates.Modified;
                stringCircles[stringCircles.length - 1 - index].state = ElementStates.Modified;
                const temp = stringCircles[index];
                stringCircles[index] = stringCircles[stringCircles.length - 1 - index];
                stringCircles[stringCircles.length - 1 - index] = temp;
                //dispatch(setStringCirlesDataAction(stringCircles));
                setValue({ ...value, stringCirclesPropsList: stringCircles });
            }
        }


    }




    //onChange = { onValueChange }
  return (
    <SolutionLayout title="Строка">
          <div>
              <div className={`${styles.inputRow}`}>
                  <Input maxLength={11} isLimitText={true} value={value.inputStr} onChange={onValueChange}></Input>
                  <Button text="Развернуть" onClick={handleTurnAroundClick}></Button>
              </div>
              <p></p>
          </div>
          <div className={`${styles.circlesGrid}`}>
              {value.stringCirclesPropsList.map((circlesProps) => (
                  <Circle key={uuidv4()} {...circlesProps} />
              ))}
          </div>
    </SolutionLayout>
  );
};

//const a: Array<number> = []
//const wait = (delay: number, ...args: any[]) => new Promise(resolve => setTimeout(resolve, delay, ...args));
//for (let i = 0; i < 10; i++) {
//    a.push(i);
//}
//async function reverseStep(arr: Array<number>) {
//    const endIndex = arr.length;
//    const mid = Math.floor(arr.length / 2);

//    for (let index = 0; index < mid; index++) {
//        if (arr.length - 1 - index === index) {

//        }
//        else {
//            arr[index] = -1 * arr[index];
//            arr[arr.length - 1 - index] = -1 * arr[arr.length - 1 - index];

//            console.log(arr);
//            //const gg = await setTimeout(()=> {
//            //    arr[index] = arr[index]-10;
//            //    arr[arr.length - 1 - index] = arr[arr.length - 1 - index]-10;
//            //    console.log("timeout");
//            //    console.log(arr);
//            //}, 1000);
//            await wait(3000);
//            arr[index] = arr[index] - 10;
//            arr[arr.length - 1 - index] = arr[arr.length - 1 - index] - 10;
//            console.log("timeout");
//            console.log(arr);
//        }
//        console.log("iter end");

//    }
//}

//reverseStep(a)