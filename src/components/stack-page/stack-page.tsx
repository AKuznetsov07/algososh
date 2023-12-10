import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { Stack } from "../../utils/linearCollection";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {
    const wait = (delay: number, ...args: any[]) => new Promise(resolve => setTimeout(resolve, delay, ...args));
    //let stringStack: Stack<string> = new Stack<string>();
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
        //setValue({ ...value, inputStr: "" });
        value.stringStack.push(value.inputStr);
        drawCircles(true);
        await wait(500);
        drawCircles(false);
    };
    const handlePopClick = async (event: MouseEvent<HTMLButtonElement>) => {
        //setValue({ ...value, inputStr: "" });
        drawCircles(true);
        value.stringStack.pop();
        await wait(500);
        drawCircles(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        value.stringStack = new Stack<string>();
        setValue({ ...value, stringCirclesPropsList: [], inputStr:"" });
    };

    function drawCircles(isLastColored: boolean) {
        console.log("")
        console.log("1")
        const values = value.stringStack.getVisualisationData();
        console.log(values)
        if (values.length===0) {
            return setValue({ ...value, stringCirclesPropsList: [], inputStr: "" });
        }
        const result: Array<CircleProps> = [];
        for (let i = 0; i < values.length;i++) {
            result.push({
                letter: values[i],
                index: i
            });
            //const newCircleState: CircleProps = {
            //    letter: values[i],
            //    index:i
            //};
        }
        console.log("3")
        console.log(result)
        if (isLastColored) {
            result[values.length - 1].state = ElementStates.Changing;
        }
        console.log("4")
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
