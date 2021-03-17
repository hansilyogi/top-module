var mongoose = require('mongoose');
var areaSchema = mongoose.Schema({

    name: {
        type: String
    },
});

module.exports = mongoose.model("Area", areaSchema);