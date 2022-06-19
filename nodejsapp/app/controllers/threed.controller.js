const { threedm } = require("../models/threed.model");

//Retrieve all the models from the database
exports.getAll = (req, res) => {
    threedm.find((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log(`Error retrieving 3D model list from database : ${JSON.stringify(err, undefined, 2)}`);
        }
    });
}

// Create a new model (upload as string)
exports.sendOne = (req, res) => {
    if(!req.body.modelstring){
        var modelString = req.file.buffer.toString('base64');
    }else{
        var modelString = req.body.modelstring;
    }
    var threed =  new threedm({modelstring: modelString, filename: req.body.filename});
    threed.save((err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            return res.json({message: `Error sending 3D model to database : ${JSON.stringify(err, undefined, 2)}`});
        }
    })
}

// Retrieve one model from the database by filename
exports.getByFilename = (req, res) => {
    threedm.findOne({filename: req.params.filename}, (err, doc) => {
        if(doc==null){
            return res.json({message: `3D model with filename ${req.params.filename} does not exist in database`});
        }else if(!err){
            res.send(doc);
        }else{
            return res.json({message: `Error retrieving 3D model list by filename : ${JSON.stringify(err, undefined, 2)}`});
        }
    })
} 

// Delete one model from the database by filename
exports.deleteByFilename = (req, res) => {
    threedm.findOneAndDelete({filename: req.params.filename}, (err, doc) => {
        if(doc==null){
            return res.json({message: `3D model with filename ${req.params.filename} does not exist in database`});
        }if (!err){
            return res.json({message: `3D model with filename ${req.params.filename} deleted`});
        }else{
            return res.json({message: `Error deleting model with filename ${req.params.filename} : ${JSON.stringify(err, undefined, 2)}`});
        }
    })
} 