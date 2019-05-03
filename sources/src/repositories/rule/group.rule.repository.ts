import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { GroupRule } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface GroupRuleOptions {
    // controller: MegaManController;
}

export class GroupRuleRepository extends MegaManSafeRepository<
    GroupRule,
    typeof GroupRule.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<GroupRule>,
                options?: GroupRuleOptions
            ) => {
                let safeOptions = options as GroupRuleOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: GroupRuleOptions) => {
                return false;
            },
            accessRead: async (
                options: GroupRuleOptions,
                entity: GroupRule
            ) => {
                return true;
            },
            accessUpdate: async (
                options: GroupRuleOptions,
                entity: GroupRule
            ) => {
                return false;
            },
            accessDelete: async (
                options: GroupRuleOptions,
                entity: GroupRule
            ) => {
                return false;
            }
        };

        super(
            GroupRule,
            new MegaManCRUDRepository<GroupRule, typeof GroupRule.prototype.id>(
                GroupRule,
                dataSource
            ),
            access
        );
    }
}
