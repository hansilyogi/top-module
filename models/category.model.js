var mongoose = require('mongoose');
var categorySchema = mongoose.Schema({

    categoryName: {
        type: String
    },
    categoryImage: {
        type: String
    }
});

module.exports = mongoose.model("Category", categorySchema);