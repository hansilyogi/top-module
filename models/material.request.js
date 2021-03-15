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
    taskId: {
        type: mongoose.Types.ObjectId,
        ref: "Task"
    },
    deliveryDate: {
        type: String
    } 
});

module.exports = mongoose.model("Material", materialSchema);