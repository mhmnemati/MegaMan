import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { Group } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface GroupOptions {
    // controller: MegaManController;
}

export class GroupRepository extends MegaManSafeRepository<
    Group,
    typeof Group.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<Group>,
                options?: GroupOptions
            ) => {
                let safeOptions = options as GroupOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: GroupOptions) => {
                return false;
            },
            accessRead: async (options: GroupOptions, entity: Group) => {
                return true;
            },
            accessUpdate: async (options: GroupOptions, entity: Group) => {
                return false;
            },
            accessDelete: async (options: GroupOptions, entity: Group) => {
                return false;
            }
        };

        super(
            Group,
            new MegaManCRUDRepository<Group, typeof Group.prototype.id>(
                Group,
                dataSource
            ),
            access
        );
    }
}
