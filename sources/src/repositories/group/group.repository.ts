import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { Group } from "@megaman/models";

export class GroupRepository extends DefaultCrudRepository<
    Group,
    typeof Group.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        super(Group, dataSource);
    }
}
