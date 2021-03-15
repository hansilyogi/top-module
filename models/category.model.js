var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({

    areaId: {
        type: mongoose.Types.ObjectId,
        ref: "Area"
    },
    categoryName: {
        type: String
    }
});

module.exports = mongoose.model("Category", categorySchema);