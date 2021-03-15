var mongoose = require('mongoose');
var projectSchema = mongoose.Schema({

    siteName: {
        type: String
    },
    location: {
        lat: {
            type: String
        },
        long: {
            type: String
        },
        address: {
            type: String
        }
    },
    date: {
        type: String
    }
});

module.exports = mongoose.model("ProjectSite", projectSchema);