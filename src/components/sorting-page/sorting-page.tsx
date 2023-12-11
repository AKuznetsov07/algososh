import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Column, ColumnProps } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { v4 as uuidv4 } from "uuid";
import { Direction } from "../../types/direction";
import { wait } from "../../utils/utils";
import { NORMAL_DELAY, SMALL_DELAY } from "../../utils/constants";

const select = "select";
const bubble = "bubble";

export const SortingPage: React.FC = () => {
    const [value, setValue] = React.useState<{
        selectedOption: string,
        arrColumnList: Array<JSX.Element>,
        unsortedColumnPropsList: Array<ColumnProps>,
        sortingUp: boolean,
        sortingDown: boolean
    }>({
        selectedOption: select,
        arrColumnList: [],
        unsortedColumnPropsList: [],
        sortingUp: false,
        sortingDown: false
    });

    function randomArr(arrLength: number) {
        const result: number[] = [];
        for (let i = 0; i < arrLength; i++) {
            result.push(Math.floor(Math.random() * 101));
        }
        return result;
    }

    async function sortBySelection2(isIncreasingDirection: boolean) {
        const sortedProps = [...value.unsortedColumnPropsList];
        for (let i = 0; i < sortedProps.length;i++) {
            let exchangeIndex = i;

            sortedProps[i].state = ElementStates.Changing;
            drawColumns(sortedProps)
            for (let j = i + 1; j < sortedProps.length; j++) {
                sortedProps[j].state = ElementStates.Changing;
                drawColumns(sortedProps)

                if ((sortedProps[exchangeIndex].index > sortedProps[j].index) === isIncreasingDirection) {
                    exchangeIndex = j;
                }


                await wait(NORMAL_DELAY);
                sortedProps[j].state = ElementStates.Default;
                drawColumns(sortedProps)
            }
            if (i !== exchangeIndex) {
                const temp = sortedProps[i];
                temp.state = ElementStates.Modified;
                sortedProps[i] = sortedProps[exchangeIndex];
                sortedProps[exchangeIndex] = temp;
                drawColumns(sortedProps)
            }
            else {
                sortedProps[i].state = ElementStates.Default;
                drawColumns(sortedProps)
            }
            await wait(NORMAL_DELAY);//да, это криво, но тк, оно не меняет стейт моментально, то без ожидания есть шанс провтыкать перерисовку столбцов.
            
            setValue({ ...value, unsortedColumnPropsList: sortedProps });
        }
    }
    async function sortBySelection(isIncreasingDirection: boolean) {
        const sortedProps = [...value.unsortedColumnPropsList];
        for (let i = 0; i < sortedProps.length; i++) {
            let exchangeIndex = i;

            sortedProps[i].state = ElementStates.Changing;
            drawColumns(sortedProps)
            for (let j = i + 1; j < sortedProps.length; j++) {
                sortedProps[j].state = ElementStates.Changing;
                drawColumns(sortedProps)

                if ((sortedProps[exchangeIndex].index > sortedProps[j].index) === isIncreasingDirection) {
                    exchangeIndex = j;
                }


                await wait(SMALL_DELAY);
                sortedProps[j].state = ElementStates.Default;
                drawColumns(sortedProps)
            }
            if (i !== exchangeIndex) {
                const temp = sortedProps[i];
                temp.state = ElementStates.Default;
                sortedProps[i] = sortedProps[exchangeIndex];
                sortedProps[i].state = ElementStates.Modified;
                sortedProps[exchangeIndex] = temp;
                drawColumns(sortedProps)
            }
            else {
                sortedProps[i].state = ElementStates.Modified;
                drawColumns(sortedProps)
            }
        }
        setValue({ ...value, unsortedColumnPropsList: sortedProps, sortingDown: false, sortingUp: false });
    }
    async function sortByBubble(isIncreasingDirection: boolean) {
        const sortedProps = [...value.unsortedColumnPropsList];
        for (let i = sortedProps.length-1; i > 0; i--) {

            for (let j = 0; j < i; j++) {
                sortedProps[j].state = ElementStates.Changing;
                sortedProps[j + 1].state = ElementStates.Changing;
                drawColumns(sortedProps);
                if ((sortedProps[j].index > sortedProps[j + 1].index) === isIncreasingDirection) { 
                    //swap(arr[i], arr[j + 1]);
                    let temp = sortedProps[j];
                    sortedProps[j] = sortedProps[j + 1];
                    sortedProps[j + 1] = temp;
                    drawColumns(sortedProps);
                }
                await wait(SMALL_DELAY);
                sortedProps[j].state = ElementStates.Default;
                sortedProps[j + 1].state = ElementStates.Default;
                drawColumns(sortedProps);
            }
            sortedProps[i].state = ElementStates.Modified;
            drawColumns(sortedProps);
        }
        sortedProps[0].state = ElementStates.Modified;
        drawColumns(sortedProps);
        setValue({ ...value, unsortedColumnPropsList: sortedProps });
    }
    function handleOptionChange(changeEvent: ChangeEvent<HTMLInputElement>) {
        setValue({...value, selectedOption: changeEvent.target.value });
    }

    function drawColumns(arr: ColumnProps[]) {
        setValue({ ...value, unsortedColumnPropsList: arr });
    }

    const handleNewArrayClick = (event: MouseEvent<HTMLButtonElement>) => {
        const propResult: ColumnProps[] = [];
        const length = Math.floor(Math.random() * 15) + 3;
        const newArr = randomArr(length)
        for (let i = 0; i < newArr.length; i++) {
            let newColumnState: ColumnProps = {
                index: newArr[i]
            };
            propResult.push(newColumnState)
        }

        //setValue({ ...value, unsortedColumnPropsList: propResult });
        //drawColumns(result); опять не успевает записать
        const colResult: Array<JSX.Element> = [];
        for (let i = 0; i < propResult.length; i++) {
            let newColumnState = <Column key={uuidv4()} {...propResult[i]} />
            colResult.push(newColumnState)
        }

        setValue({ ...value, arrColumnList: colResult, unsortedColumnPropsList: propResult });
    };
    const handleUpSortClick = async (event: MouseEvent<HTMLButtonElement>) => {
        ClearColumnsState();
        setValue({ ...value, sortingUp: true });
        switch (value.selectedOption) {
            case select:
                await sortBySelection(true);
                break;
            case bubble:
                await sortByBubble(true);
                break;
            default:
                break;
        }
    };
    const handleDownSortClick = async (event: MouseEvent<HTMLButtonElement>) => {
        ClearColumnsState();
        setValue({ ...value, sortingDown: true });
        switch (value.selectedOption) {
            case select:
                await sortBySelection(false);
                break;
            case bubble:
                await sortByBubble(false);
                break;
            default:
                break;
        }

    };
    function ClearColumnsState() {
        const sortedProps = [...value.unsortedColumnPropsList];
        for (let i = 0; i < sortedProps.length; i++) {
            sortedProps[i].state = ElementStates.Default;
        }
        drawColumns(sortedProps);
    }

  return (
    <SolutionLayout title="Сортировка массива">
          <form>
              <div className={`${styles.inputRow}`}>
                  <RadioInput label="select" value={select} checked={value.selectedOption === select} onChange={handleOptionChange}></RadioInput>
                  <RadioInput label="bubble" value={bubble} checked={value.selectedOption === bubble} onChange={handleOptionChange}></RadioInput>
                  <Button text="Up" onClick={handleUpSortClick} sorting={Direction.Ascending} isLoader={value.sortingUp}></Button>
                  <Button text="down" onClick={handleDownSortClick} sorting={Direction.Descending} isLoader={value.sortingDown}></Button>
                  <Button text="new" onClick={handleNewArrayClick}></Button>
              </div>
              <div className={`${styles.columnsGrid}`}>
                  {/*{value.arrColumnPropsList.map((columnProps) => (*/}
                  {/*    <Column key={uuidv4()} {...columnProps} />*/}
                  {/*))}*/}
                  {/*{value.arrColumnList }*/}
                  {value.unsortedColumnPropsList.map((columnProps) => (
                      <Column key={uuidv4()} {...columnProps} />
                  ))}
              </div>
          </form>
    </SolutionLayout>
  );
};
