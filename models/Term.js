const mongoose = require('mongoose')

const FunctionSchema = new mongoose.Schema({
  abbreviation: {
    type: String,
    required: [true, 'Term abbreviation is required'],
    unique: [true, 'Duplicate term abbreviation'],
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Term name is required'],
    unique: [true, 'Duplicate term name'],
    trim: true
  },
  description: String,
  moreInfo: String
})

module.exports = mongoose.model('Term', FunctionSchema)