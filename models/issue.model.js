var mongoose = require('mongoose');
var issueSchema = mongoose.Schema({

    taskId: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },
    vendorName: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Issue", issueSchema);