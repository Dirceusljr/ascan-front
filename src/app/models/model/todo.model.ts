import { PriorityEnum } from "../enum/priority";

export class Todo {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public dueDate: Date,
        public priority: PriorityEnum,
        public done: boolean
    ) { }
}
