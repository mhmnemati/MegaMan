import { inject, Getter } from "@loopback/core";
import {
    repository,
    DefaultCrudRepository,
    BelongsToAccessor
} from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { GroupRepository, RuleRepository } from "@megaman/repositories";

import { GroupRule, Group, Rule } from "@megaman/models";

export class GroupRuleRepository extends DefaultCrudRepository<
    GroupRule,
    typeof GroupRule.prototype.id
> {
    public readonly group: BelongsToAccessor<
        Group,
        typeof GroupRule.prototype.id
    >;
    public readonly rule: BelongsToAccessor<
        Rule,
        typeof GroupRule.prototype.id
    >;

    constructor(
        @inject("datasources.MongoDB") dataSource: MongoDBDataSource,
        @repository.getter(GroupRepository)
        groupRepositoryGetter: Getter<GroupRepository>,
        @repository.getter(RuleRepository)
        ruleRepositoryGetter: Getter<RuleRepository>
    ) {
        super(GroupRule, dataSource);

        this.group = this.createBelongsToAccessorFor(
            "group",
            groupRepositoryGetter
        );
        this.rule = this.createBelongsToAccessorFor(
            "rule",
            ruleRepositoryGetter
        );
    }
}
