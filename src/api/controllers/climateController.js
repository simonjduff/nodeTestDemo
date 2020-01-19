var database = require('../services/database')

exports.submitClimate = function(req,res){
    try {
        var data = database.storeData(req.body.temp, req.body.time);
        res.status(201).send(dataToModel(data));
    } catch (error) {
        var errorReturn = {
            message: error.message
        };
        res.status(500).send(errorReturn);
    }    
}

exports.fetchClimate = function(req,res){
    var data = database.fetchData(req.params.id);
    
    if (!data || !data.id){
        console.log(`404ing`);
        res.status(404).send();
        return;
    }

    var model = dataToModel(data);

    if (req.query.unit === 'fahrenheit'){
        model.temp.unit = 'fahrenheit';
        model.temp.value = (model.temp.value * 9) / 5 +  32
    }
    res.status(200).send(model);
}

function dataToModel(data)
{
    return {
        id: data.id,
        time: data.time,
        temp: {
            value: data.temp,
            unit: 'celsius'
        }
    }
}