import { inject, Context, Server, CoreBindings } from "@loopback/core";

import { MegaManApplication } from "@megaman/application";

import Telegraf, { ContextMessageUpdate } from "telegraf";

export class MegaManTelegrafServer extends Context implements Server {
    private _listening: boolean = false;
    private _server: Telegraf<ContextMessageUpdate>;

    constructor(
        @inject(CoreBindings.APPLICATION_INSTANCE)
        app: MegaManApplication
    ) {
        super(app);
    }

    get listening() {
        return this._listening;
    }
    async start() {
        this._server = new Telegraf(process.env.BOT_TOKEN as string, {
            username: process.env.BOT_USERNAME
        });
        // bind controllers
        await this._server.launch();
        this._listening = true;

        console.log(
            `Telegraf Server is running on token ${this._server.token}`
        );
    }
    async stop() {
        await this._server.stop();
        this._listening = false;

        console.log(`Telegraf Server stopping!`);
    }
}
