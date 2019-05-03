import { Entity, model, property } from "@loopback/repository";

@model()
export class Group extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true
    })
    id: string;

    constructor(data?: Partial<Group>) {
        super(data);
    }
}
