var mongoose = require('mongoose');
var areaSchema = mongoose.Schema({

    areaName: {
        type: String
    },
    areaImage: {
        type: String
    }
});

module.exports = mongoose.model("Area", areaSchema);