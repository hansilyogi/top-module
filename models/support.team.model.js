var mongoose = require('mongoose');
var supportteamSchema = mongoose.Schema({

    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "ProjectSite"
    },
    subtituteStaff: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    reason: {
        type: String
    }
});

module.exports = mongoose.model("Supportteam", supportteamSchema);