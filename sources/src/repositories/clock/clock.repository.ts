import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { Clock } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface ClockOptions {
    // controller: MegaManController;
}

export class ClockRepository extends MegaManSafeRepository<
    Clock,
    typeof Clock.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<Clock>,
                options?: ClockOptions
            ) => {
                let safeOptions = options as ClockOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: ClockOptions) => {
                return false;
            },
            accessRead: async (options: ClockOptions, entity: Clock) => {
                return true;
            },
            accessUpdate: async (options: ClockOptions, entity: Clock) => {
                return false;
            },
            accessDelete: async (options: ClockOptions, entity: Clock) => {
                return false;
            }
        };

        super(
            Clock,
            new MegaManCRUDRepository<Clock, typeof Clock.prototype.id>(
                Clock,
                dataSource
            ),
            access
        );
    }
}
