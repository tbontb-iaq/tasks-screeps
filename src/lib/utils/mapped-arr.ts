class MappingArray<T1, T2> extends Array<T1> {
    static get [Symbol.species]() { return Array; }
    constructor(
        private t2Arr: T2[],
        t2ToT1: (t2: T2) => T1,
        private t1ToT2: (t1: T1) => T2
    ) {
        super(...t2Arr.map((t2) => t2ToT1(t2)));
    }

    override push(...items: T1[]): number {
        this.t2Arr.push(...items.map((t1) => this.t1ToT2(t1)));
        return super.push(...items);
    }

    override splice(start: number, deleteCount?: number): T1[] {
        // splice(0, undefined) 与 splice(0) 是不同的
        if (arguments.length === 1) {
            this.t2Arr.splice(start);
            return super.splice(start);
        } else {
            this.t2Arr.splice(start, deleteCount);
            return super.splice(start, deleteCount);
        }
    }
}

export { MappingArray };
