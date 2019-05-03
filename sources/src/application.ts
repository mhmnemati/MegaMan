import { BootMixin } from "@loopback/boot";
import { ServiceMixin } from "@loopback/service-proxy";
import { RepositoryMixin } from "@loopback/repository";
import { Application, ApplicationConfig } from "@loopback/core";

import { MegaManTelegrafServer } from "@megaman/servers/telegraf/server";

export class MegaManApplication extends BootMixin(
    ServiceMixin(RepositoryMixin(Application))
) {
    constructor(options: ApplicationConfig = {}) {
        super(options);

        // Booter configs
        this.projectRoot = __dirname;
        this.bootOptions = {
            controllers: {
                dirs: ["servers"],
                extensions: [".controller.js"],
                nested: true
            },
            repositories: {}
        };

        // Servers binding
        this.server(MegaManTelegrafServer);
    }
}
