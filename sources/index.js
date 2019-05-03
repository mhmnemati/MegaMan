require("dotenv-safe").config({
    allowEmptyValues: true
});
require("module-alias/register");
const application = require("./dist");

module.exports = application;

if (require.main === module) {
    // Run the application
    application.main().catch(err => {
        console.error("Cannot start the application.", err);
        process.exit(1);
    });
}
