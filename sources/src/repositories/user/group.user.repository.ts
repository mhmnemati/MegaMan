import { inject, Getter } from "@loopback/core";
import {
    repository,
    DefaultCrudRepository,
    BelongsToAccessor
} from "@loopback/repository";
import { MongoDBDataSource } from "@megaman/datasources";

import { GroupRepository, UserRepository } from "@megaman/repositories";

import { GroupUser, Group, User } from "@megaman/models";

export class GroupUserRepository extends DefaultCrudRepository<
    GroupUser,
    typeof GroupUser.prototype.id
> {
    public readonly group: BelongsToAccessor<
        Group,
        typeof GroupUser.prototype.id
    >;
    public readonly user: BelongsToAccessor<
        User,
        typeof GroupUser.prototype.id
    >;
    public readonly parent: BelongsToAccessor<
        User,
        typeof GroupUser.prototype.id
    >;

    constructor(
        @inject("datasources.MongoDB") dataSource: MongoDBDataSource,
        @repository.getter(GroupRepository)
        groupRepositoryGetter: Getter<GroupRepository>,
        @repository.getter(UserRepository)
        userRepositoryGetter: Getter<UserRepository>
    ) {
        super(GroupUser, dataSource);

        this.group = this.createBelongsToAccessorFor(
            "group",
            groupRepositoryGetter
        );
        this.user = this.createBelongsToAccessorFor(
            "user",
            userRepositoryGetter
        );
        this.parent = this.createBelongsToAccessorFor(
            "parent",
            userRepositoryGetter
        );
    }
}
