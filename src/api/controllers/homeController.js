exports.get = function(req,res){
    res.send("hello yes");
}

exports.healthcheck = function(req,res){
    res.status(200).send('');
}