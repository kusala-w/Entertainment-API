const Express = require("express");
const BodyParser = require("body-parser");
const database = require("./helpers/database-helper");
const port = 3000;
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded( { extended: true }));

var routes = require("./routes/routes");
routes(app);

database.connectToDatabase(function(){
    app.listen(port, async() => {
        console.log("Listening to port " + port + "...");
    });
});