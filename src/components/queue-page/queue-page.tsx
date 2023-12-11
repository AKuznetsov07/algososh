import React, { ChangeEvent, MouseEvent, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import styles from "./queue-page.module.css";
import { Queue } from "../../utils/linearCollection";
import { Circle, CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { v4 as uuidv4 } from "uuid";
import { wait } from "../../utils/utils";
import { SMALL_DELAY } from "../../utils/constants";

export const QueuePage: React.FC = () => {
    const [value, setValue] = React.useState<{
        inputStr: string,
        stringStack: Queue<string>,
        stringCirclesPropsList: Array<CircleProps>
    }>({
        inputStr: "",
        stringStack: new Queue<string>(7),
        stringCirclesPropsList: []
    });
    useEffect(() => {
        drawCircles(false);
    },[])

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, inputStr: e.target.value });
    };
    const handleEnqueueClick = async (event: MouseEvent<HTMLButtonElement>) => {
        let tailIndex = value.stringStack.getTail();
        if (tailIndex !== null) {
            tailIndex++;
        }
        else {
            tailIndex = 0;
        }

        drawCircles(true, tailIndex);
        value.stringStack.enqueue(value.inputStr);
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handleDequeueClick = async (event: MouseEvent<HTMLButtonElement>) => {
        let headIndex = value.stringStack.getHead();
        if (headIndex===null) {
            headIndex = 0;
        }
        drawCircles(true, headIndex);
        value.stringStack.dequeue();
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        value.stringStack = new Queue<string>(7);
        drawCircles(false);
    };

    function drawCircles(isColored: boolean, colorIndex:number = 0) {
        const values = value.stringStack.getVisualisationData();
        if (values.length === 0) {
            return setValue({ ...value, stringCirclesPropsList: [], inputStr: "" });
        }
        const result: Array<CircleProps> = [];
        for (let i = 0; i < values.length; i++) {
            const letterValue = values[i] !== null ? values[i] : "" as string;
            result.push({
                letter: letterValue as string,
                index: i
            });
        }

        if (isColored) {
            result[colorIndex].state = ElementStates.Changing;
        }

        const headIndex = value.stringStack.getHead();
        if (headIndex !== null) {
            result[headIndex].head = "head";
        }
        const tailIndex = value.stringStack.getTail();
        if (tailIndex) {
            result[tailIndex].tail = "tail";
        }
        setValue({ ...value, stringCirclesPropsList: result, inputStr: "" });
    }


  return (
      <SolutionLayout title="Очередь">
          <div className={`${styles.inputRow}`}>
              <Input maxLength={4} isLimitText={true} value={value.inputStr} onChange={onValueChange}></Input>
              <Button text="add" onClick={handleEnqueueClick}></Button>
              <Button text="drop" onClick={handleDequeueClick}></Button>
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
