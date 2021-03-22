var mongoose = require('mongoose');
var commentSchema = mongoose.Schema({

    taskId: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Member"
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);