
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
export class Queue<T> {
    private container: (T | null)[] = [];
    private _head = 0;
    private _tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }
        this.container[this._tail % this.size] = item;
        this._tail++;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        const item = this.container[this._head]
        delete this.container[this._head]
        this._head++;
        this.length = this.length - 1;
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        return this.container[this._head];
    };

    isEmpty = () => this.length === 0;
    getVisualisationData = () => [...this.container]
    getTail = () => {
        if (this.length === 0) {
            return null;
        }
        else {
            return this._tail - 1;
        }
    }
    getHead = () => {
        if (this.length === 0) {
            return null;
        }
        else {
            return this._head;
        }
    }
}