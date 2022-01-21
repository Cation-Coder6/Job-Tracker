const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company: {
        type: 'String',
        required: [true, "Please Provide a Company Name"],
        maxLength: 50,
    },
    position: {
        type: 'String',
        required: [true, "Please Provide a Position"],
        maxLength: 100
    },
    status: {
        type: 'String',
        enum: ['interview', 'declined', 'pending'],
        default: "pending",
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please Provide Username"]
    }
}, { timestamps: true })

module.exports = mongoose.model("Job", JobSchema);