import { inject } from "@loopback/core";
import { juggler } from "@loopback/repository";
import config from "./mongodb.config";

export class MongoDBDataSource extends juggler.DataSource {
    static dataSourceName = "MongoDB";

    constructor(
        @inject("datasources.config.MongoDB", { optional: true })
        dsConfig: object = config
    ) {
        super(dsConfig);
    }
}
