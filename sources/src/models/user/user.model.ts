import { Entity, model, property } from "@loopback/repository";

@model()
export class User extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true
    })
    id: string;

    @property({
        type: "number",
        default: 0
    })
    stars: number;

    @property({
        type: "number",
        default: 0
    })
    warns: number;

    @property({
        type: "boolean",
        default: false
    })
    admin: boolean;

    constructor(data?: Partial<User>) {
        super(data);
    }
}
