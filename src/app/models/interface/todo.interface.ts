import { PriorityEnum } from "../enum/priority.enum";

export interface ITodo {
    id: number;
    title: string;
    description: string;
    dueDate: Date;
    priority: PriorityEnum;
    done: boolean;
}