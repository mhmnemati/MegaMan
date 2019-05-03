import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { GroupUser } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface GroupUserOptions {
    // controller: MegaManController;
}

export class GroupUserRepository extends MegaManSafeRepository<
    GroupUser,
    typeof GroupUser.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<GroupUser>,
                options?: GroupUserOptions
            ) => {
                let safeOptions = options as GroupUserOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: GroupUserOptions) => {
                return false;
            },
            accessRead: async (
                options: GroupUserOptions,
                entity: GroupUser
            ) => {
                return true;
            },
            accessUpdate: async (
                options: GroupUserOptions,
                entity: GroupUser
            ) => {
                return false;
            },
            accessDelete: async (
                options: GroupUserOptions,
                entity: GroupUser
            ) => {
                return false;
            }
        };

        super(
            GroupUser,
            new MegaManCRUDRepository<GroupUser, typeof GroupUser.prototype.id>(
                GroupUser,
                dataSource
            ),
            access
        );
    }
}
