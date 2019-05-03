import { Entity, model, property, belongsTo } from "@loopback/repository";

import { Group } from "@megaman/models";

@model()
export class Spam extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true
    })
    id: string;

    @belongsTo(() => Group, { keyTo: "id" })
    group: string;

    @property({
        type: "string",
        required: true
    })
    regex: string;

    constructor(data?: Partial<Spam>) {
        super(data);
    }
}
