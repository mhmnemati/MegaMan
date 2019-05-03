import { Entity, Model, model, property } from "@loopback/repository";

@model()
export class MegaManModel<Entity> {
    @property({
        type: "boolean",
        required: true
    })
    read: boolean;

    @property({
        type: "boolean",
        required: true
    })
    update: boolean;

    @property({
        type: "boolean",
        required: true
    })
    delete: boolean;

    @property()
    entity: Entity;
}

@model()
export class MegaManModels<Entity> extends Entity {
    @property({
        type: "boolean",
        required: true
    })
    create: boolean;

    @property.array(MegaManModel as (new () => MegaManModel<Entity>), {
        required: true
    })
    models: MegaManModel<Entity>[];

    constructor(data?: Partial<MegaManModels<Model>>) {
        super(data);
    }
}

export function MegaManModelsSchema<Entity>(
    ctor: typeof Entity & { prototype: Entity }
) {
    return {
        type: "object",
        properties: {
            create: {
                type: "boolean"
            },
            models: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        read: {
                            type: "boolean"
                        },
                        update: {
                            type: "boolean"
                        },
                        delete: {
                            type: "boolean"
                        },
                        entity: { "x-ts-type": ctor }
                    }
                }
            }
        }
    };
}
