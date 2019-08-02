const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = "mongodb+srv://application-user:1qaz2wsx!!@testcluster-kfiky.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "playbill_db";
const COLLECTION_NAME = "show_info";

var new_app = Express();

new_app.use(BodyParser.json());
new_app.use(BodyParser.urlencoded( { extended: true }));

var database, collection;

new_app.listen(3001, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
    
        database = client.db(DATABASE_NAME);        
        console.log("Connected to '" + DATABASE_NAME + "'");
    });
});

new_app.get("/shows/all", (request,response) => {
    console.log("GET request recieved...")
    collection = database.collection(COLLECTION_NAME);

    collection.find({}).toArray((error, result) => {
        console.log("inside find...")
        if(error) {
            console.log("error found...")
            return response.status(500).send(error);
        }
        
        console.log("returning results...")
        response.send(result);
    });
});

