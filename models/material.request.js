var mongoose = require('mongoose');
var materialSchema = mongoose.Schema({

    materialName: {
        type: String
    },
    quantity: {
        type: String
    },
    unit: {
        type: String
    },
    // projectId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "ProjectSite"
    // },
    // areaId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Area"
    // },
    // categoryId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Category"
    // },
    taskId: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "Member"
    },
    deliveryDate: {
        type: String
    },
    dateTime: {
        type: String
    },
    status: {
        type: String,
        default: "0"
    } 
});

module.exports = mongoose.model("Material", materialSchema);