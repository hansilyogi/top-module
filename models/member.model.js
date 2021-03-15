var mongoose = require('mongoose');
var memberSchema = mongoose.Schema({

    name: {
        type: String
    },
    mobileNo: {
        type: String
    },
    emailId: {
        type: String
    },
    role: {
        type: String,
        enum: ['customer','staff','vendor']
    },
    password: {
        type: String
    },
    deviceType: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male','female','other']
    },
    fcmToken: {
        type: String
    },
    memberImg: {
        type: String
    }
});

module.exports = mongoose.model("Member", memberSchema);