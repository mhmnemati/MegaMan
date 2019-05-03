require("dotenv-safe").config({
    allowEmptyValues: true
});
require("module-alias/register");
const application = require("./dist");

module.exports = application;

if (require.main === module) {
    // Migrate the application database
    application.migrate(process.argv).catch(err => {
        console.error("Cannot migrate database schema", err);
        process.exit(1);
    });
}
