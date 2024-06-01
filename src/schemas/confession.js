const { Schema, model } = require('mongoose');

const confession = new Schema({
  confessNumber: { type: Number, required: true },
});

module.exports = model('confession', confession);
