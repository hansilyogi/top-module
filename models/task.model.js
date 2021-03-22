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
    vendorId: {
        type: mongoose.Types.ObjectId,
        ref: "Member"
    },
    staffId: {
        type: mongoose.Types.ObjectId,
        ref: "Member"
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    status: {
        type: String,
        default: "0"
    },
    percentage: {
        type: String
    },
    mobileNo: {
        type: String
    },
    taskImage: {
        type: String
    }
});

module.exports = mongoose.model("Task", taskSchema);