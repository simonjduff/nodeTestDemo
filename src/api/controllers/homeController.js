var database = require('../services/database')

exports.get = function(req,res){
    res.send("hello yes");
}

exports.healthcheck = function(req,res){
    var response = {
        healthy:true
    };
    res.status(200).send(response);
}

exports.databaseCall = function(req,res){
    try {
        var data = database.fetchData();
        res.status(200).send(data);
    } catch (error) {
        var errorReturn = {
            message: error.message
        };
        res.status(500).send(errorReturn);
    }
    
}