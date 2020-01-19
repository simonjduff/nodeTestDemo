var database = require('../services/database')

exports.submitClimate = function(req,res){
    try {
        var data = database.storeData(req.body.temp, req.body.time);
        res.status(201).send(data);
    } catch (error) {
        var errorReturn = {
            message: error.message
        };
        res.status(500).send(errorReturn);
    }    
}

exports.fetchClimate = function(req,res){
    var data = database.fetchData(req.params.id);
    res.status(200).send(data);
}