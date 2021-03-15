var mongoose = require('mongoose');
var areaSchema = mongoose.Schema({

    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "ProjectSite"
    },
    area: {
        type: String
    },
});

module.exports = mongoose.model("Area", areaSchema);