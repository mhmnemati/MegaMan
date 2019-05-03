import { Entity, model, property, belongsTo } from "@loopback/repository";

import { Group, Rule } from "@megaman/models";

@model()
export class GroupRule extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true
    })
    id: string;

    @belongsTo(() => Group, { keyTo: "id" })
    group: string;

    @belongsTo(() => Rule, { keyTo: "id" })
    rule: string;

    constructor(data?: Partial<GroupRule>) {
        super(data);
    }
}
