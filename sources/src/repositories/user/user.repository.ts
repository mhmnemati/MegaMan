import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { User } from "@megaman/models";

export class UserRepository extends DefaultCrudRepository<
    User,
    typeof User.prototype.id
> {
    constructor(@inject("datasources.MongoDB") dataSource: MongoDBDataSource) {
        super(User, dataSource);
    }
}
