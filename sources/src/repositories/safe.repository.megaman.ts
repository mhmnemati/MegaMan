import { Entity, Count, Filter, Where } from "@loopback/repository";

import { MegaManRepository, MegaManOptions } from "@megaman/repositories";

import { MegaManModels } from "@megaman/models";

import * as uuid from "uuid/v4";

export type CreateOptions = MegaManOptions & {
    clearID: boolean;
    checkUnique: boolean;
    clearHidden: boolean;
};
export type ReadOptions = MegaManOptions & {
    clearHidden: boolean;
};
export type UpdateOptions = MegaManOptions & {
    clearID: boolean;
    checkUnique: boolean;
};
export type DeleteOptions = MegaManOptions & {};

export interface MegaManSafeRepositoryAccess<Model extends Entity> {
    accessOptions(
        filter?: Filter<Model>,
        options?: MegaManOptions
    ): Promise<MegaManOptions>;
    accessCreate(options: MegaManOptions): Promise<boolean>;
    accessRead(options: MegaManOptions, entity: Model): Promise<boolean>;
    accessUpdate(options: MegaManOptions, entity: Model): Promise<boolean>;
    accessDelete(options: MegaManOptions, entity: Model): Promise<boolean>;
}

export class MegaManSafeRepository<Model extends Entity, ID> {
    private ctor: typeof Entity & { prototype: Model };
    private respository: MegaManRepository<Model, ID>;
    private access: MegaManSafeRepositoryAccess<Model>;

    constructor(
        ctor: typeof Entity & { prototype: Model },
        respository: MegaManRepository<Model, ID>,
        access: MegaManSafeRepositoryAccess<Model>
    ) {
        this.ctor = ctor;
        this.respository = respository;
        this.access = access;
    }

    private getIDProps() {
        let result = [];

        for (let key in this.ctor.definition.properties) {
            let property = this.ctor.definition.properties[key];

            if (property.id) {
                result.push({ key: key, type: property.type });
            }
        }

        return result;
    }
    private getUniqueProps() {
        let result = [];

        for (let key in this.ctor.definition.properties) {
            let property = this.ctor.definition.properties[key];

            if (property.unique) {
                result.push({ key: key, type: property.type });
            }
        }

        return result;
    }
    private getHiddenProps() {
        let result = [];

        for (let key in this.ctor.definition.properties) {
            let property = this.ctor.definition.properties[key];

            if (property.hidden) {
                result.push({ key: key, type: property.type });
            }
        }

        return result;
    }

    private async clearIDField(entity: Model, fill: boolean): Promise<Model> {
        let result: any = Object.assign({}, entity);

        for (let item of this.getIDProps()) {
            // check that iterated property is `id`, `non required` then `autofill it`
            if (fill) {
                result[item.key] = uuid();
            } else {
                delete result[item.key];
            }
        }

        return result;
    }
    private async checkUniqueFields(
        entity: Model,
        options: MegaManOptions
    ): Promise<Model> {
        let result: any = Object.assign({}, entity);

        // get id field
        let id_key = this.getIDProps()[0].key;

        for (let item of this.getUniqueProps()) {
            let where: Where<Model>;

            if (item.type === "array") {
                where = {
                    and: [
                        {
                            [id_key]: { neq: result[id_key] }
                        },
                        {
                            [item.key]: {
                                inq: [...(result[item.key] || "")]
                            }
                        }
                    ]
                };
            } else {
                where = {
                    and: [
                        { [id_key]: { neq: result[id_key] } },
                        { [item.key]: result[item.key] }
                    ]
                };
            }

            await this.existsFilter(where, {
                ...options,
                isExists: false
            });
        }

        return result;
    }
    private async clearHiddenFields(entity: Model): Promise<Model> {
        let result: any = Object.assign({}, entity);

        for (let item of this.getHiddenProps()) {
            // check that iterated property is `hidden` then `clear` that value from model
            delete result[item.key];
        }

        return result;
    }

    async create(entity: Model, options?: CreateOptions): Promise<Model> {
        if (options && options.clearID) {
            entity = await this.clearIDField(entity, true);
        }

        if (options && options.checkUnique) {
            entity = await this.checkUniqueFields(entity, options);
        }

        entity = await this.respository.create(entity, options);

        if (options && options.clearHidden) {
            entity = await this.clearHiddenFields(entity);
        }

        return entity as Model;
    }
    async createAll(
        entities: Model[],
        options?: CreateOptions
    ): Promise<Model[]> {
        if (options && options.clearID) {
            for (let i = 0; i < entities.length; i++) {
                entities[i] = await this.clearIDField(entities[i], true);
            }
        }

        if (options && options.checkUnique) {
            for (let i = 0; i < entities.length; i++) {
                entities[i] = await this.checkUniqueFields(
                    entities[i],
                    options
                );
            }
        }

        entities = await this.respository.createAll(entities, options);

        if (options && options.clearHidden) {
            for (let i = 0; i < entities.length; i++) {
                entities[i] = await this.clearHiddenFields(entities[i]);
            }
        }

        return entities as Model[];
    }
    async save(entity: Model, options?: CreateOptions): Promise<Model> {
        if (options && options.clearID) {
            entity = await this.clearIDField(entity, true);
        }

        if (options && options.checkUnique) {
            entity = await this.checkUniqueFields(entity, options);
        }

        entity = await this.respository.save(entity, options);

        if (options && options.clearHidden) {
            entity = await this.clearHiddenFields(entity);
        }

        return entity as Model;
    }
    async find(
        filter?: Filter<Model>,
        options?: ReadOptions
    ): Promise<Model[]> {
        let entities = await this.respository.find(filter, options);

        if (options && options.clearHidden) {
            for (let i = 0; i < entities.length; i++) {
                entities[i] = await this.clearHiddenFields(entities[i]);
            }
        }

        return entities as Model[];
    }
    async findAccess(
        filter?: Filter<Model>,
        options?: ReadOptions
    ): Promise<MegaManModels<Model>> {
        let entities = await this.respository.find(filter, options);

        if (options && options.clearHidden) {
            for (let i = 0; i < entities.length; i++) {
                entities[i] = await this.clearHiddenFields(entities[i]);
            }
        }

        let accessOptions = await this.access.accessOptions(filter, options);
        let accessEntities = new MegaManModels<Model>({
            create: await this.access.accessCreate(accessOptions),
            models: []
        });
        for (let entity of entities) {
            accessEntities.models.push({
                read: await this.access.accessRead(accessOptions, entity),
                update: await this.access.accessUpdate(accessOptions, entity),
                delete: await this.access.accessDelete(accessOptions, entity),
                entity: entity
            });
        }

        return accessEntities as MegaManModels<Model>;
    }
    async findOne(
        filter?: Filter<Model>,
        options?: ReadOptions
    ): Promise<Model | null> {
        let entity = await this.respository.findOne(filter, options);

        if (options && options.clearHidden) {
            if (entity !== null) {
                entity = await this.clearHiddenFields(entity);
            }
        }

        return entity as (Model | null);
    }
    async findById(
        id: ID,
        filter?: Filter<Model>,
        options?: ReadOptions
    ): Promise<Model> {
        let entity = await this.respository.findById(id, filter, options);

        if (options && options.clearHidden) {
            entity = await this.clearHiddenFields(entity);
        }

        return entity as Model;
    }
    async update(entity: Model, options?: UpdateOptions): Promise<void> {
        if (options && options.clearID) {
            entity = await this.clearIDField(entity, false);
        }

        if (options && options.checkUnique) {
            entity = await this.checkUniqueFields(entity, options);
        }

        return await this.respository.update(entity, options);
    }
    async delete(entity: Model, options?: DeleteOptions): Promise<void> {
        return await this.respository.delete(entity, options);
    }
    async updateAll(
        data: Model,
        where?: Where<Model>,
        options?: UpdateOptions
    ): Promise<Count> {
        if (options && options.clearID) {
            data = await this.clearIDField(data, false);
        }

        if (options && options.checkUnique) {
            data = await this.checkUniqueFields(data, options);
        }

        return await this.respository.updateAll(data, where, options);
    }
    async updateById(
        id: ID,
        data: Model,
        options?: UpdateOptions
    ): Promise<void> {
        if (options && options.clearID) {
            data = await this.clearIDField(data, false);
        }

        if (options && options.checkUnique) {
            data = await this.checkUniqueFields(data, options);
        }

        return await this.respository.updateById(id, data, options);
    }
    async replaceById(
        id: ID,
        data: Model,
        options?: UpdateOptions
    ): Promise<void> {
        if (options && options.clearID) {
            data = await this.clearIDField(data, false);
        }

        if (options && options.checkUnique) {
            data = await this.checkUniqueFields(data, options);
        }

        return await this.respository.replaceById(id, data, options);
    }
    async deleteAll(
        where?: Where<Model>,
        options?: DeleteOptions
    ): Promise<Count> {
        return await this.respository.deleteAll(where, options);
    }
    async deleteById(id: ID, options?: DeleteOptions): Promise<void> {
        return await this.respository.deleteById(id, options);
    }
    async count(
        where?: Where<Model>,
        options?: MegaManOptions
    ): Promise<Count> {
        return await this.respository.count(where, options);
    }
    async exists(id: ID, options?: MegaManOptions): Promise<boolean> {
        return await this.respository.exists(id, options);
    }
    async existsFilter(
        where?: Where<Model>,
        options?: MegaManOptions & { isExists: boolean }
    ): Promise<void> {
        let exists =
            (await this.respository.findOne({ where: where }, options)) !==
            null;

        if (options && options.isExists) {
            if (!exists) {
                throw {
                    name: "DatabaseError",
                    status: 404,
                    message: `Not Found Resource`
                };
            }
        } else {
            if (exists) {
                throw {
                    name: "DatabaseError",
                    status: 409,
                    message: `Conflict Resource: ${JSON.stringify(where)}`
                };
            }
        }
    }
}
