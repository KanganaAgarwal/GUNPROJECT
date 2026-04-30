const mongoose = require('mongoose');

const gunSchema = new mongoose.Schema({
    gunName: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    automatic: { type: Boolean }
}, { timestamps: true });

module.exports = mongoose.model('Gun', gunSchema);