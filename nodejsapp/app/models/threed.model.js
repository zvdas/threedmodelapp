const mongoose = require("mongoose");

var schema = mongoose.Schema({
    modelstring: { type: String },
    filename: { type: String }
}, {
    timestamps : true
});

schema.method("toJSON", function(){
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})

var threedm = mongoose.model("threed", schema);

module.exports = { threedm };