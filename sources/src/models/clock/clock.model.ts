import { Entity, model, property, belongsTo } from "@loopback/repository";

import { Group } from "@megaman/models";

@model()
export class Clock extends Entity {
    @property({
        type: "string",
        id: true
    })
    id: string;

    @belongsTo(() => Group, { keyTo: "id" })
    group: string;

    @property({
        type: "string",
        required: true
    })
    from: string;

    @property({
        type: "string",
        required: true
    })
    to: string;

    constructor(data?: Partial<Clock>) {
        super(data);
    }
}
