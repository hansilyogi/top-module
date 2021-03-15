var mongoose = require('mongoose');
var taskSchema = mongoose.Schema({

    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "ProjectSite"
    },
    areaId: {
        type: mongoose.Types.ObjectId,
        ref: "Area"
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    taskName: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    percentage: {
        type: String
    }
});

module.exports = mongoose.model("Task", taskSchema);