const mongoose = require('mongoose')

const OfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Offer name is required'],
    trim: true
  },
  description: String
})

module.exports = mongoose.model('Offer', OfferSchema)