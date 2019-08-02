module.exports = function(app) {
    var controller = require("../controllers/playbill-controller");

    app.get("/shows/all", async (request, response) => {
        controller.getAllShows(request, response);
    });
}



