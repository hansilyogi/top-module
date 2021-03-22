var mongoose = require('mongoose');
var projectcategorySchema = mongoose.Schema({

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
    }
});

module.exports = mongoose.model("Projectcategory", projectcategorySchema);