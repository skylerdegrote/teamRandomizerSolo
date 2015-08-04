/**
 * Created by Skyler DeGrote on 8/3/15.
 */
    //routes/index.js

var express = require("express");
//takes the routing functionality from express
var router = express.Router();//Router has to be capitalized
var studentData = require('../public/data/teams.json');
var path = require("path");

router.get("/data", function(request, response){
    response.json(studentData);
});

router.get("/*", function(req, res){// the /* is the "wild card"
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));//need two dots because of being in a different folder inside public folder
});

//exports stuff
module.exports = router;//refers to the variable at the top