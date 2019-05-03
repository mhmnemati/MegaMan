import { Entity, model, property } from "@loopback/repository";

@model()
export class Rule extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true
    })
    id: string;

    @property({
        type: "string",
        required: true
    })
    name: string;

    @property({
        type: "boolean",
        default: false
    })
    default: boolean;

    constructor(data?: Partial<Rule>) {
        super(data);
    }
}
