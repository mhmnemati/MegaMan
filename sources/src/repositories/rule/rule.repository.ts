import { inject } from "@loopback/core";
import { Filter } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import {
    MegaManSafeRepository,
    MegaManCRUDRepository
} from "@megaman/repositories";

import { Rule } from "@megaman/models";
// import { MegaManController } from "@megaman/servers/rest/controllers";

export interface RuleOptions {
    // controller: MegaManController;
}

export class RuleRepository extends MegaManSafeRepository<
    Rule,
    typeof Rule.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        const access = {
            accessOptions: async (
                filter?: Filter<Rule>,
                options?: RuleOptions
            ) => {
                let safeOptions = options as RuleOptions;

                // get options

                return safeOptions;
            },
            accessCreate: async (options: RuleOptions) => {
                return false;
            },
            accessRead: async (options: RuleOptions, entity: Rule) => {
                return true;
            },
            accessUpdate: async (options: RuleOptions, entity: Rule) => {
                return false;
            },
            accessDelete: async (options: RuleOptions, entity: Rule) => {
                return false;
            }
        };

        super(
            Rule,
            new MegaManCRUDRepository<Rule, typeof Rule.prototype.id>(
                Rule,
                dataSource
            ),
            access
        );
    }
}
