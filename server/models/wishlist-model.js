const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
    }],
}, { timestamps: true });
const Wishlist = new model('Wishlist', wishlistSchema)
module.exports = Wishlist;

