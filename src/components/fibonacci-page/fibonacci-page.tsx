import React, { ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle, CircleProps } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { v4 as uuidv4 } from "uuid";
import { wait } from "../../utils/utils";
import { NORMAL_DELAY } from "../../utils/constants";

export const FibonacciPage: React.FC = () => {
    const maxValue = 19;
    const [value, setValue] = React.useState<{ inputInt: number | undefined, fibCirclesPropsList: Array<CircleProps> }>({ inputInt: undefined, fibCirclesPropsList: [] });


    const handleCountFibClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (value.inputInt) {
            drawNumber(value.inputInt);
        }
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
            setValue({ ...value, fibCirclesPropsList: newList });
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
            setValue({ ...value, inputInt: newValue });
        }
    };
    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <div>
                <div className={`${styles.inputRow}`}>
                    <Input max={maxValue} type="number" isLimitText={true} value={value.inputInt} onChange={onValueChange}></Input>
                    <Button text="Развернуть" onClick={handleCountFibClick}></Button>
                </div>
            </div>
            <div className={`${styles.circlesGrid}`}>
                {value.fibCirclesPropsList.map((circlesProps) => (
                    <Circle key={uuidv4()} {...circlesProps} />
                ))}
            </div>
        </SolutionLayout>
    );
};
