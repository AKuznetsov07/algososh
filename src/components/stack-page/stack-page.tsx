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
    const [value, setValue] = React.useState<{
        inputStr: string,
        stringStack: Stack<string>,
        stringCirclesPropsList: Array<CircleProps>
    }>({
        inputStr: "",
        stringStack: new Stack<string>(),
        stringCirclesPropsList: []
    });
    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, inputStr: e.target.value });
    };
    const handlePushClick = async (event: MouseEvent<HTMLButtonElement>) => {
        value.stringStack.push(value.inputStr);
        drawCircles(true);
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handlePopClick = async (event: MouseEvent<HTMLButtonElement>) => {
        drawCircles(true);
        value.stringStack.pop();
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        value.stringStack = new Stack<string>();
        setValue({ ...value, stringCirclesPropsList: [], inputStr:"" });
    };

    function drawCircles(isLastColored: boolean) {
        const values = value.stringStack.getVisualisationData();
        if (values.length===0) {
            return setValue({ ...value, stringCirclesPropsList: [], inputStr: "" });
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
        setValue({ ...value, stringCirclesPropsList: result, inputStr: "" });
    }


  return (
    <SolutionLayout title="Стек">
          <div className={`${styles.inputRow}`}>
              <Input maxLength={4} isLimitText={true} value={value.inputStr} onChange={onValueChange}></Input>
              <Button text="add" onClick={handlePushClick}></Button>
              <Button text="drop" onClick={handlePopClick}></Button>
              <Button text="clear" onClick={handleClearClick}></Button>
          </div>
          <div className={`${styles.circlesGrid}`}>
              {value.stringCirclesPropsList.map((circlesProps) => (
                  <Circle key={uuidv4()} {...circlesProps} />
              ))}
          </div>
    </SolutionLayout>
  );
};
