export class Todo {
    constructor(
        public id: string,
        public text: string,
        public completed: boolean = false,
        public synced: boolean = false
    ) {}
}