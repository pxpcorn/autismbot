const { Schema, model } = require('mongoose');

const starboard = new Schema({
  originalMessageId: { type: String, required: true, unique: true },
  starboardMessageId: { type: String, required: true },
});

module.exports = model('starboard', starboard);
