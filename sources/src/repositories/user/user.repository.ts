import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { User } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface UserOptions {
    // controller: MegaManController;
}

export class UserRepository extends MegaManSafeRepository<
    User,
    typeof User.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<User>,
                options?: UserOptions
            ) => {
                let safeOptions = options as UserOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: UserOptions) => {
                return false;
            },
            accessRead: async (options: UserOptions, entity: User) => {
                return true;
            },
            accessUpdate: async (options: UserOptions, entity: User) => {
                return false;
            },
            accessDelete: async (options: UserOptions, entity: User) => {
                return false;
            }
        };

        super(
            User,
            new MegaManCRUDRepository<User, typeof User.prototype.id>(
                User,
                dataSource
            ),
            access
        );
    }
}
