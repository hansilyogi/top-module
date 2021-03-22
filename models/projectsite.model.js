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
    customerId: {
        type: mongoose.Types.ObjectId,
        ref: "Member" 
    },
    staffId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Member"
        }
    ],
    startDate: {
        type: String
    },
    siteImg: {
        type: String
    },
    status: {
        type: String,
        default: "0"
    }
});

module.exports = mongoose.model("ProjectSite", projectSchema);