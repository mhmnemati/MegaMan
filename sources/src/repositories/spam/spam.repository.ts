import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { Spam } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface SpamOptions {
    // controller: MegaManController;
}

export class SpamRepository extends MegaManSafeRepository<
    Spam,
    typeof Spam.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<Spam>,
                options?: SpamOptions
            ) => {
                let safeOptions = options as SpamOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: SpamOptions) => {
                return false;
            },
            accessRead: async (options: SpamOptions, entity: Spam) => {
                return true;
            },
            accessUpdate: async (options: SpamOptions, entity: Spam) => {
                return false;
            },
            accessDelete: async (options: SpamOptions, entity: Spam) => {
                return false;
            }
        };

        super(
            Spam,
            new MegaManCRUDRepository<Spam, typeof Spam.prototype.id>(
                Spam,
                dataSource
            ),
            access
        );
    }
}
