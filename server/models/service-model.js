const { Schema, model } = require("mongoose")

const serviceSchema = new Schema({
    service: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        // required: true
    },
    provider: {
        type: String,
        required: true
    },
    link: {
        type: String,
        // required: true
    },
    source: {
        type: [String],
    },
    category: {
        type: String,
        enum: ['Projects', 'Topics', 'Solved questions'],
        required: false
    },
    curri:{
        type: [String],
        required: false
    },
    pic: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
})

const Service = new model('Service', serviceSchema)

module.exports = Service;