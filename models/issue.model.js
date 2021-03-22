var mongoose = require('mongoose');
var issueSchema = mongoose.Schema({

    // projectId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "ProjectSite"
    // },
    // areaId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Area"
    // },
    taskId: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },
    vendorName: {
        type: String
    },
    description: {
        type: String
    },
    attachment: {
        type: String
    }
});

module.exports = mongoose.model("Issue", issueSchema);