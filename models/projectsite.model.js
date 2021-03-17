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
    },
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Member" 
    },
    siteImg: {
        type: String
    },
    staffId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Member"
        }
    ]
});

module.exports = mongoose.model("ProjectSite", projectSchema);