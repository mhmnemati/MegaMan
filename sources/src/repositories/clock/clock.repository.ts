import { inject, Getter } from "@loopback/core";
import {
    repository,
    DefaultCrudRepository,
    BelongsToAccessor
} from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { GroupRepository } from "@megaman/repositories";

import { Clock, Group } from "@megaman/models";

export class ClockRepository extends DefaultCrudRepository<
    Clock,
    typeof Clock.prototype.id
> {
    public readonly group: BelongsToAccessor<Group, typeof Clock.prototype.id>;

    constructor(
        @inject("datasources.MongoDB") dataSource: MongoDBDataSource,
        @repository.getter(GroupRepository)
        groupRepositoryGetter: Getter<GroupRepository>
    ) {
        super(Clock, dataSource);

        this.group = this.createBelongsToAccessorFor(
            "group",
            groupRepositoryGetter
        );
    }
}
