var mongoose = require('mongoose');
var reviewSchema = mongoose.Schema({

    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Member"
    },
    areaId: {
        type: mongoose.Types.ObjectId,
        ref: "Area"
    },
    rating: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("Review", reviewSchema);