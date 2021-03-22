var mongoose = require('mongoose');
var projectareaSchema = mongoose.Schema({

    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "ProjectSite" 
    },
    areaId: {
        type: mongoose.Types.ObjectId,
        ref: "Area"
    }
    
});

module.exports = mongoose.model("Projectarea", projectareaSchema);