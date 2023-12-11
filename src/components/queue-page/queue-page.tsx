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
    const queueMaxLength = 7;

    const [inputStr, setInputStr] = React.useState<string>("");
    const [stringQueue, setStringQueue] = React.useState<Queue<string>>(new Queue<string>(queueMaxLength));
    const [stringCirclesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    useEffect(() => {
        drawCircles(false);
    },[])

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputStr(e.target.value);
    };
    const handleEnqueueClick = async (event: MouseEvent<HTMLButtonElement>) => {
        let tailIndex = stringQueue.getTail();
        if (tailIndex !== null) {
            tailIndex++;
        }
        else {
            tailIndex = 0;
        }

        drawCircles(true, tailIndex);
        stringQueue.enqueue(inputStr);
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handleDequeueClick = async (event: MouseEvent<HTMLButtonElement>) => {
        let headIndex = stringQueue.getHead();
        if (headIndex===null) {
            headIndex = 0;
        }
        drawCircles(true, headIndex);
        stringQueue.dequeue();
        await wait(SMALL_DELAY);
        drawCircles(false);
    };
    const handleClearClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setStringQueue(new Queue<string>(queueMaxLength));
        setInputStr("")
        const result: Array<CircleProps> = [];
        for (let i = 0; i < queueMaxLength; i++) {
            result.push({
                index: i
            });
        }
        setPropsList(result);
    };

    function drawCircles(isColored: boolean, colorIndex:number = 0) {
        const values = stringQueue.getVisualisationData();
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

        const headIndex = stringQueue.getHead();
        if (headIndex !== null) {
            result[headIndex].head = "head";
        }
        const tailIndex = stringQueue.getTail();
        if (tailIndex) {
            result[tailIndex].tail = "tail";
        }

        setPropsList(result);
        setInputStr("")
    }


  return (
      <SolutionLayout title="Очередь">
          <div className={`${styles.inputRow}`}>
              <Input maxLength={4} isLimitText={true} value={inputStr} onChange={onValueChange}></Input>
              <Button text="add" onClick={handleEnqueueClick} disabled={(inputStr.length === 0) || (stringQueue.getTail() === queueMaxLength - 1)}></Button>
              <Button text="drop" onClick={handleDequeueClick} disabled={stringQueue.getHead() ===null }></Button>
              <Button text="clear" onClick={handleClearClick} disabled={stringQueue.getHead() === null}></Button>
          </div>
          <div className={`${styles.circlesGrid}`}>
              {stringCirclesPropsList.map((circlesProps) => (
                  <Circle key={uuidv4()} {...circlesProps} />
              ))}
          </div>
    </SolutionLayout>
  );
};
