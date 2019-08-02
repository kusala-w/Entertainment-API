const database = require("../helpers/database-helper")


async function getAllShows(request, response) {
        var allShows = await database.getShowsCollection();
        
        if(allShows) {
            allShows.find({}).toArray((error, result) => {
                if(error) {
                    console.log("Error converting shows to array");
                    return response.status(500).send(error);
                }
                
                response.send(result);
            });
        }
}



module.exports = {
    getAllShows
};