import { Entity, model, property, belongsTo } from "@loopback/repository";

import { Group, User } from "@megaman/models";

@model()
export class GroupUser extends Entity {
    @property({
        type: "string",
        defaultFn: "uuidv4",
        id: true
    })
    id: string;

    @belongsTo(() => Group, { keyTo: "id" })
    group: string;

    @belongsTo(() => User, { keyTo: "id" })
    user: string;

    @belongsTo(() => User, { keyTo: "id" })
    parent: string;

    constructor(data?: Partial<GroupUser>) {
        super(data);
    }
}
