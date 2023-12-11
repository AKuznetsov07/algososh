import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { Stack } from "../../utils/linearCollection";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { wait } from "../../utils/utils";
import { SMALL_DELAY } from "../../utils/constants";

export const StackPage: React.FC = () => {
    const [inputStr, setInputStr] = React.useState<string>("");
    const [stringCirclesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    const [stringStack, setStringStack] = React.useState<Stack<string>>(new Stack<string>());
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputStr(e.target.value);
    };
    const handlePushClick = async (event: MouseEvent<HTMLButtonElement>) => {
        stringStack.push(inputStr);
        drawCircles(true);
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handlePopClick = async (event: MouseEvent<HTMLButtonElement>) => {
        drawCircles(true);
        stringStack.pop();
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setStringStack(new Stack<string>());
        setPropsList([]);
        setInputStr("")
    };

    function drawCircles(isLastColored: boolean) {
        const values = stringStack.getVisualisationData();
        if (values.length===0) {
            setPropsList([]);
            setInputStr("")
        }
        const result: Array<CircleProps> = [];
        for (let i = 0; i < values.length;i++) {
            result.push({
                letter: values[i],
                index: i
            });
        }
        if (isLastColored) {
            result[values.length - 1].state = ElementStates.Changing;
        }
        result[values.length - 1].head = "top";
        setPropsList([...result]);
        setInputStr("")
    }


  return (
    <SolutionLayout title="Стек">
          <div className={`${styles.inputRow}`}>
              <Input maxLength={4} isLimitText={true} value={inputStr} onChange={onValueChange}></Input>
              <Button text="add" onClick={handlePushClick} disabled={inputStr.length === 0}></Button>
              <Button text="drop" onClick={handlePopClick} disabled={stringStack.getSize()===0}></Button>
              <Button text="clear" onClick={handleClearClick} disabled={stringStack.getSize() === 0}></Button>
          </div>
          <div className={`${styles.circlesGrid}`}>
              {stringCirclesPropsList.map((circlesProps) => (
                  <Circle key={uuidv4()} {...circlesProps} />
              ))}
          </div>
    </SolutionLayout>
  );
};
