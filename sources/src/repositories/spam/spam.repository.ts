import { inject, Getter } from "@loopback/core";
import {
    repository,
    DefaultCrudRepository,
    BelongsToAccessor
} from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { GroupRepository } from "@megaman/repositories";

import { Spam, Group } from "@megaman/models";

export class SpamRepository extends DefaultCrudRepository<
    Spam,
    typeof Spam.prototype.id
> {
    public readonly group: BelongsToAccessor<Group, typeof Spam.prototype.id>;

    constructor(
        @inject("datasources.MongoDB") dataSource: MongoDBDataSource,
        @repository.getter(GroupRepository)
        groupRepositoryGetter: Getter<GroupRepository>
    ) {
        super(Spam, dataSource);

        this.group = this.createBelongsToAccessorFor(
            "group",
            groupRepositoryGetter
        );
    }
}
