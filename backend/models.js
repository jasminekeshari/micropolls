// MongoDB Models - backend/models.js

const mongoose = require('mongoose');

// Schema for storing polls
const PollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    text: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: 0
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
PollSchema.index({ createdAt: -1 });

const Poll = mongoose.model('Poll', PollSchema);

module.exports = { Poll };