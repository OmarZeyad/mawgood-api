const mongoose = require('mongoose')

const BrandsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  }
})

const TypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Type name is required'],
    unique: [true, 'Duplicate type name'],
    trim: true
  },
  image: {
    type: String,
    default: 'no-image.jpg'
  },
  brands: [BrandsSchema]
})

module.exports = mongoose.model('Type', TypeSchema)