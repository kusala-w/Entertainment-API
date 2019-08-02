const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = "mongodb+srv://application-user:1qaz2wsx!!@testcluster-kfiky.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "playbill_db";
const SHOWS_COLLECTIOION_NAME = "show_info";

var database = null;
var showsCollection = null;

async function connectToDatabase(callback) {
    if(database == null) {
        let client;

        try {
            client = await MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true });
            database = client.db(DATABASE_NAME);
            console.log("Connected to '" + DATABASE_NAME + "'");
        }
        catch(error) {
            console.log("Error connecting to the DB. Error = " + error);
        }
    }

    callback();
}

async function getShowsCollection() {
    if(database == null) {
        console.log("No DB available. Connecting to DB");
            await connectToDatabase();
    }

    if(database != null && showsCollection == null) {
        showsCollection = database.collection(SHOWS_COLLECTIOION_NAME);
    }
    else {
        if(database == null) {
            console.log("DB is not available even after connecting");
        }
    }

    return showsCollection;
}

module.exports = {
    connectToDatabase,
    getShowsCollection
};