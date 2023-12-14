import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle, CircleProps } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";

import { wait } from "../../utils/utils";
import { NORMAL_DELAY } from "../../utils/constants";

export const FibonacciPage: React.FC = () => {
    const maxValue = 19;
    const [inputInt, setInputInt] = React.useState<number | undefined>(undefined);
    const [fibCirclesPropsList, setPropsList] = React.useState<Array<CircleProps>>([]);
    const [isDisabled, setIsDisabledValue] = React.useState(true);
    const [isProgressing, setProgressingValue] = React.useState(false);


    const handleCountFibClick = async (event: MouseEvent<HTMLButtonElement>) => {
        setProgressingValue(true);
        if (inputInt) {
            await drawNumber(inputInt);
        }
        setProgressingValue(false);
    };
    async function drawNumber(maxValue: number) {

        let newList: Array<CircleProps> = []
        for (let i = 0; i <= maxValue; i++) {

            const fibValue = fib(i)
            let newCircleState: CircleProps = {
                letter: fibValue.toString(),
                index: i
            };
            newList = [...newList, newCircleState]
            setPropsList(newList);
            await wait(NORMAL_DELAY);
        }
    }

    const fib = (n: number, memo: Record<number, number> = {}): number => {
        if (n in memo) {
            return memo[n];
        }
        if (n < 2) {
            return 1;
        }
        memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
        return memo[n];
    }; 

    const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value)
        if (newValue >= 0 && newValue <= maxValue) {
            setInputInt(newValue);
            setIsDisabledValue(false);
        }
        else {
            setIsDisabledValue(true);
        }
    };
    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div className={`${styles.pageContent}`}>
                <div className={`${styles.contentColumn}`}>
                    <div>
                        <div className={`${styles.inputRow}`}>
                            <Input max={maxValue} isLimitText={true} value={inputInt}
                                onChange={onValueChange}
                                type="number"
                                disabled={isProgressing}></Input>
                            <Button text="Развернуть" onClick={handleCountFibClick}
                                disabled={isDisabled || isProgressing} isLoader={isProgressing}></Button>
                        </div>
                    </div>
                    <ul className={`${styles.circlesGrid}`}>
                        {fibCirclesPropsList.map((circlesProps,ind) => (
                            <Circle key={ind} {...circlesProps} />
                        ))}
                    </ul>
                </div>
            </div>
        </SolutionLayout>
    );
};
