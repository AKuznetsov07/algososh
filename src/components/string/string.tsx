import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle, CircleProps } from "../ui/circle/circle";
import { v4 as uuidv4 } from "uuid";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import { NORMAL_DELAY } from "../../utils/constants";

export const StringComponent: React.FC = () => {
    const [value, setValue] = React.useState<{ inputStr: string, stringCirclesPropsList: Array<CircleProps> }>({ inputStr: "", stringCirclesPropsList :[]});

    const handleTurnAroundClick = (event: MouseEvent<HTMLButtonElement>) => {
        const charArrayToReverse = value.inputStr.split('');
        const stringCircles: Array<CircleProps> = [];
        for (let i = 0; i < charArrayToReverse.length; i++) {
            const newCircleState: CircleProps = {
                letter: charArrayToReverse[i]
            };
            stringCircles.push(newCircleState)
        }
        reverseStep(stringCircles);
    };

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, inputStr: e.target.value });
    };

    async function reverseStep(stringCircles: Array<CircleProps>) {
        const mid = Math.floor(stringCircles.length / 2);

        for (let index = 0; index <= mid; index++) {
            let reverseInd = stringCircles.length - 1 - index;
            if (reverseInd !== index) {
                stringCircles[index].state = ElementStates.Changing;
                stringCircles[reverseInd].state = ElementStates.Changing;
                setValue({ ...value, stringCirclesPropsList: stringCircles });
            }
            await wait(NORMAL_DELAY);
            //console.log(index)
            stringCircles[index].state = ElementStates.Modified;
            stringCircles[reverseInd].state = ElementStates.Modified;
            const temp = stringCircles[index];
            stringCircles[index] = stringCircles[reverseInd];
            stringCircles[reverseInd] = temp;
            setValue({ ...value, stringCirclesPropsList: stringCircles });
        }
    }
  return (
    <SolutionLayout title="Строка">
          <div>
              <div className={`${styles.inputRow}`}>
                  <Input maxLength={11} isLimitText={true} value={value.inputStr} onChange={onValueChange}></Input>
                  <Button text="Развернуть" onClick={handleTurnAroundClick}></Button>
              </div>
          </div>
          <div className={`${styles.circlesGrid}`}>
              {value.stringCirclesPropsList.map((circlesProps) => (
                  <Circle key={uuidv4()} {...circlesProps} />
              ))}
          </div>
    </SolutionLayout>
  );
};