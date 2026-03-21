const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe',
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: '',
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['veg', 'non-veg', 'customer-insights'],
        default: 'veg',
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    isSpecial: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: '', // You can store a URL or path to the image
        trim: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
