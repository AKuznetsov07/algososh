import React, { ChangeEvent, MouseEvent, ReactNode } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./list-page.module.css";
import { Circle, CircleProps } from "../ui/circle/circle";
import { LinkedList, Node } from "../../utils/linearCollection";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";

export const ListPage: React.FC = () => {
    const wait = (delay: number, ...args: any[]) => new Promise(resolve => setTimeout(resolve, delay, ...args));
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

    //async function insertNodeAt(insertIndex: number) {
    //    const newCircleState: CircleProps = {
    //        letter: value.nodeStr,
    //        state: ElementStates.Modified
    //    };
    //    let newNode: Node<CircleProps>|null = null;
    //    if (value.rootNode && insertIndex!==0) {
    //        let prev: Node<CircleProps> | null = null;
    //        let nextNode: Node<CircleProps> | null = value.rootNode;
    //        for (let i = 0; i <= insertIndex; i++) {
    //            if (nextNode === null) {
    //                //throw new Error("Maximum length exceeded");
    //                break;//если за пределами списка не нашёл, что делать. Можно канешн хардкодно чекать размер до вызова, но не оч надёжное решение.
    //            }
    //            prev = nextNode;
    //            nextNode = nextNode.next;
    //        }
    //        newNode = new Node<CircleProps>(newCircleState);
    //        if (prev !== null) {//так-то тут не может быть нулл, но тс не в курсе.
    //            prev.next = newNode;
    //        }

    //        newNode.next = nextNode;
    //    }
    //    else {
    //        newNode = new Node<CircleProps>(newCircleState);
    //        newNode.next = value.rootNode;
    //        setValue({ ...value, rootNode: newNode, nodeStr: "", indStr:"" });
    //    }
    //    drawCircles();
    //    await wait(500);
    //    if (newNode) {
    //        newNode.value.state = ElementStates.Default;
    //    }
    //    drawCircles();
    //}

    //function drawCirclesOld() {
    //    const result: Array<CircleProps> = [];
    //    if (value.rootNode) {
    //    }
    //    let propsNode = value.rootNode;
    //    while (propsNode) {
    //        result.push(propsNode.value);
    //        propsNode = propsNode.next;
    //    }
    //    console.log("drawCircles")
    //    console.log(result)
    //    console.log(value.rootNode)
    //    setValue({ ...value, circlesPropsList: result });
    //}
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

    //function insertAtOld(index:number) {

    //    const newCircleState: CircleProps = {
    //        letter: value.nodeStr,
    //        state: ElementStates.Changing
    //    };
    //    const newCircle: ReactNode = <Circle key={uuidv4()} {...newCircleState} isSmall={true} />
    //}
    
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
            await wait(500);
            if (head) {
                head.value.head = null;
            }
            value.LinkedNodeList.addHead({
                letter: value.nodeStr,
                state: ElementStates.Modified
            });
            drawCircles();
            await wait(500);
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
            await wait(500);
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
            await wait(500);
            if (tail) {
                tail.value.head = null;
            }
            value.LinkedNodeList.addTail({
                letter: value.nodeStr,
                state: ElementStates.Modified
            });
            drawCircles();
            await wait(500);
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
            await wait(500);
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
                await wait(500);
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
                await wait(500);
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
                    await wait(500);
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
            await wait(500);
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
                    await wait(500);
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
                await wait(500);
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
