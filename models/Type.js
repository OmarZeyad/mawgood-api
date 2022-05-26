const mongoose = require('mongoose')

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
  brands: {
    type: [{
      name: {
        type: String,
        trim: true
      },
      image: {
        type: String,
        default: 'no-image.jpg'
      }
    }],
    default: []
  }
})

module.exports = mongoose.model('Type', TypeSchema)