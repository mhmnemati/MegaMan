import {
    DefaultCrudRepository,
    Entity,
    Filter,
    Where,
    Count
} from "@loopback/repository";

// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface MegaManOptions {
    // controller: MegaManController;
}

export interface MegaManRepository<Model extends Entity, ID> {
    create(entity: Model, options?: MegaManOptions): Promise<Model>;
    createAll(entities: Model[], options?: MegaManOptions): Promise<Model[]>;
    save(entity: Model, options?: MegaManOptions): Promise<Model>;
    find(filter?: Filter<Model>, options?: MegaManOptions): Promise<Model[]>;
    findOne(
        filter?: Filter<Model>,
        options?: MegaManOptions
    ): Promise<Model | null>;
    findById(
        id: ID,
        filter?: Filter<Model>,
        options?: MegaManOptions
    ): Promise<Model>;
    update(entity: Model, options?: MegaManOptions): Promise<void>;
    delete(entity: Model, options?: MegaManOptions): Promise<void>;
    updateAll(
        data: Model,
        where?: Where<Model>,
        options?: MegaManOptions
    ): Promise<Count>;
    updateById(id: ID, data: Model, options?: MegaManOptions): Promise<void>;
    replaceById(id: ID, data: Model, options?: MegaManOptions): Promise<void>;
    deleteAll(where?: Where<Model>, options?: MegaManOptions): Promise<Count>;
    deleteById(id: ID, options?: MegaManOptions): Promise<void>;
    count(where?: Where<Model>, options?: MegaManOptions): Promise<Count>;
    exists(id: ID, options?: MegaManOptions): Promise<boolean>;
}

export class MegaManCRUDRepository<Model extends Entity, ID>
    extends DefaultCrudRepository<Model, ID>
    implements MegaManRepository<Model, ID> {}
