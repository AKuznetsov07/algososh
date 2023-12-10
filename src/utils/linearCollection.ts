
export class Stack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container = [...this.container, item]
    };

    pop = (): void => {
        const size = this.getSize();
        if (this.getSize()) {
            this.container.splice(size - 1, 1);
        }
    };

    peak = (): T | null => {
        const size = this.getSize();
        if (this.getSize()) {
            return this.container[size - 1];
        }
        return null;
    };

    getSize = () => this.container.length;
    getVisualisationData = () => [...this.container]
}