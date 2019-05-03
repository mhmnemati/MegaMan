import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { Rule } from "@megaman/models";

export class RuleRepository extends DefaultCrudRepository<
    Rule,
    typeof Rule.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        super(Rule, dataSource);
    }
}
