const mongoose = require('mongoose');

const subsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true

  },

  subToChannel:{
    type: String,
    required: true
  },

  subDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('subs', subsSchema);