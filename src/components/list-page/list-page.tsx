import React, { ChangeEvent, MouseEvent, ReactNode } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { Circle, CircleProps } from "../ui/circle/circle";
import { LinkedList, Node } from "../../utils/linearCollection";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { wait } from "../../utils/utils";
import { SMALL_DELAY } from "../../utils/constants";

export const ListPage: React.FC = () => {
    const [value, setValue] = React.useState<{
        indStr: string,
        nodeStr: string,
        LinkedNodeList: LinkedList<CircleProps> ,
        circlesPropsList: Array<CircleProps>
    }>({
        indStr: "",
        nodeStr: "",
        LinkedNodeList: new LinkedList(),
        circlesPropsList: []
    });

    function drawCircles() {
        const result: CircleProps[] = [];
        let tempNode = value.LinkedNodeList.getAt(0)
        let i = 0;
        while (tempNode) {
            const prop = tempNode.value;
            prop.index = i;
            result.push(prop);
            tempNode = tempNode.next;
            i++;
        }
        setValue({ ...value, circlesPropsList: result });
    }
    
    const handleAddHeadClick = async (event: MouseEvent<HTMLButtonElement>) => {
        if (value.LinkedNodeList.getSize()) {

            const smallCircleState: CircleProps = {
                letter: value.nodeStr,
                state: ElementStates.Changing,
                isSmall:true
            };
            const smallCircle = <Circle key={uuidv4()} {...smallCircleState} />
            let head = value.LinkedNodeList.getAt(0)
            if (head) {
                head.value.head = smallCircle;
            }
            drawCircles();
            await wait(SMALL_DELAY);
            if (head) {
                head.value.head = null;
            }
            value.LinkedNodeList.addHead({
                letter: value.nodeStr,
                state: ElementStates.Modified
            });
            drawCircles();
            await wait(SMALL_DELAY);
            head = value.LinkedNodeList.getAt(0)
            if (head) {
                head.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        else {
            const newCircleState: CircleProps = {
                letter: value.nodeStr,
                state: ElementStates.Modified
            };
            value.LinkedNodeList.addHead(newCircleState);
            drawCircles();
            await wait(SMALL_DELAY);
            const head = value.LinkedNodeList.getAt(0)
            if (head) {
                head.value.state = ElementStates.Default;
            }
            drawCircles();
        }
    };
    const handleAddTailClick = async (event: MouseEvent<HTMLButtonElement>) => {//TODO если будет время, не забыть мигалку зеленым в отдельный метод (4 раза), тело хвоста и конца в один метод
        const size = value.LinkedNodeList.getSize()
        if (size) {

            const smallCircleState: CircleProps = {
                letter: value.nodeStr,
                state: ElementStates.Changing,
                isSmall: true
            };
            const smallCircle = <Circle key={uuidv4()} {...smallCircleState} />
            let tail = value.LinkedNodeList.getAt(size - 1);
            if (tail) {
                tail.value.head = smallCircle;
            }
            drawCircles();
            await wait(SMALL_DELAY);
            if (tail) {
                tail.value.head = null;
            }
            value.LinkedNodeList.addTail({
                letter: value.nodeStr,
                state: ElementStates.Modified
            });
            drawCircles();
            await wait(SMALL_DELAY);
            tail = value.LinkedNodeList.getAt(size)
            if (tail) {
                tail.value.state = ElementStates.Default;
            }
            drawCircles();
        }
        else {
            const newCircleState: CircleProps = {
                letter: value.nodeStr,
                state: ElementStates.Modified
            };
            value.LinkedNodeList.addHead(newCircleState);
            drawCircles();
            await wait(SMALL_DELAY);
            const tail = value.LinkedNodeList.getAt(0)
            if (tail) {
                tail.value.state = ElementStates.Default;
            }
            drawCircles();
        }
    };
    const handleRemoveHeadClick = async (event: MouseEvent<HTMLButtonElement>) => {
        const size = value.LinkedNodeList.getSize()
        if (size) {
            const head = value.LinkedNodeList.getAt(0);

            if (head) {
                const headValue = head.value.letter;
                head.value.letter = "";
                const smallCircleState: CircleProps = {
                    letter: headValue,
                    state: ElementStates.Changing,
                    isSmall: true
                };
                const smallCircle = <Circle key={uuidv4()} {...smallCircleState} />
                head.value.tail = smallCircle;

                drawCircles();
                await wait(SMALL_DELAY);
                value.LinkedNodeList.removeHead();
                drawCircles();
            }
        }
    };
    const handleRemoveTailClick = async (event: MouseEvent<HTMLButtonElement>) => {
        const size = value.LinkedNodeList.getSize()
        if (size) {
            const tail = value.LinkedNodeList.getAt(size-1);

            if (tail) {
                const headValue = tail.value.letter;
                tail.value.letter = "";
                const smallCircleState: CircleProps = {
                    letter: headValue,
                    state: ElementStates.Changing,
                    isSmall: true
                };
                const smallCircle = <Circle key={uuidv4()} {...smallCircleState} />
                tail.value.tail = smallCircle;

                drawCircles();
                await wait(SMALL_DELAY);
                value.LinkedNodeList.removeTail();
                drawCircles();
            }
        }
    };
    const handleInsertAtClick = async (event: MouseEvent<HTMLButtonElement>) => {
        const insertInd = Number(value.indStr);
        const smallCircleState: CircleProps = {
            letter: value.nodeStr,
            state: ElementStates.Changing,
            isSmall: true
        };
        const smallCircle = <Circle key={uuidv4()} {...smallCircleState} />
        const size = value.LinkedNodeList.getSize();

        if (insertInd <= size) {
            for (let i = 0; i <= insertInd; i++) {
                const tempNode = value.LinkedNodeList.getAt(i)
                if (tempNode) {
                    tempNode.value.head = smallCircle;
                    drawCircles();
                    await wait(SMALL_DELAY);
                    tempNode.value.state = ElementStates.Changing;
                    tempNode.value.head = i === 0 ? "head" : "";
                }
            }
            for (let i = 0; i <= insertInd; i++) {
                const tempNode = value.LinkedNodeList.getAt(i)
                if (tempNode) {
                    tempNode.value.state = ElementStates.Default;
                }
            }
            const newCircleState: CircleProps = {
                letter: value.nodeStr,
                state: ElementStates.Modified
            };
            value.LinkedNodeList.insertAt(newCircleState, insertInd);
            drawCircles();
            await wait(SMALL_DELAY);
            const tail = value.LinkedNodeList.getAt(insertInd)
            if (tail) {
                tail.value.state = ElementStates.Default;
            }
            drawCircles();
        }
    };
    const handleRemoveAtClick = async (event: MouseEvent<HTMLButtonElement>) => {
        const removeInd = Number(value.indStr);
        const size = value.LinkedNodeList.getSize();
        if (removeInd <= size) {
            for (let i = 0; i < removeInd; i++) {
                const tempNode = value.LinkedNodeList.getAt(i)
                if (tempNode) {
                    tempNode.value.state = ElementStates.Changing;
                    drawCircles();
                    await wait(SMALL_DELAY);
                }
            }
            const tempNode = value.LinkedNodeList.getAt(removeInd);
            if (tempNode) {

                for (let i = 0; i <= removeInd; i++) {
                    const tempNode = value.LinkedNodeList.getAt(i)
                    if (tempNode) {
                        tempNode.value.state = ElementStates.Default;
                    }
                }
                const smallCircleState: CircleProps = {
                    letter: tempNode.value.letter,
                    state: ElementStates.Changing,
                    isSmall: true
                };
                const smallCircle = <Circle key={uuidv4()} {...smallCircleState} />
                tempNode.value.letter = "";
                tempNode.value.tail = smallCircle;
                drawCircles();
                await wait(SMALL_DELAY);
                value.LinkedNodeList.removeAt(removeInd);
                drawCircles();
            }

        }
    };
    const onNodeStrValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, nodeStr: e.target.value });
    };
    const onIndValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({ ...value, indStr: e.target.value });
    };
  return (
      <SolutionLayout title="Связный список">
          <div>
              <div className={`${styles.inputRow}`}>
                  <Input maxLength={4} isLimitText={true} value={value.nodeStr} onChange={onNodeStrValueChange}></Input>
                  <Button text="add to head" onClick={handleAddHeadClick}></Button>
                  <Button text="add to tail" onClick={handleAddTailClick }></Button>
                  <Button text="remove head" onClick={handleRemoveHeadClick }></Button>
                  <Button text="remove tail" onClick={handleRemoveTailClick}></Button>
              </div>
              <div className={`${styles.inputRow}`}>
                  <Input value={value.indStr} onChange={onIndValueChange}></Input>
                  <Button text="add at index" onClick={handleInsertAtClick}></Button>
                  <Button text="remove at index" onClick={handleRemoveAtClick}></Button>
              </div>
          </div>
          <div className={`${styles.circlesGrid}`}>
              {value.circlesPropsList.map((circlesProps) => (
                  <Circle key={uuidv4()} {...circlesProps} />
              ))}
          </div>
    </SolutionLayout>
  );
};
