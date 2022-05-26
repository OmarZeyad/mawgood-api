const mongoose = require('mongoose')

const TechnicalSpecsSchema = new mongoose.Schema({
  "Weight": String,
  "Monitor": String,
  "Battery": String,
  "Active Probe Connector": String,
  "Modes": String,
  "Probes": String,
  "Advanced Technologies": String,
  "New Technologies for Excellent Image Quality": String,
  "Functions Standard": String,
  "Peripherals (O/Ps)": String,
  "Certificates": String,
  "Applications": String,
  "Power Supply": String,
  "Radiography KV": String,
  "Radiography mA": String,
  "Exposure Time": String,
  "High-Voltage Generator Capacity": String,
  "High-Voltage Generator Output Voltage": String,
  "High-Voltage Generator output Current": String,
  "Maximum Remote Control Distance": String,
  "Height from X-ray Tube Focus to Floor": String,
  "Focal Distance": String,
  "Net Weight of the Unit": String,
  "X-ray Tube Model": String,
  "X-ray Tube Focus": String,
  "Radiographic Table": String,
  "Max Cassette for Radiography": String,
  "Description": String,
  "Options": String,
  "Characteristics": String
})

const EquipmentSchema = new mongoose.Schema({
  "type": {
    type: String,
    required: [true, 'Equipment type is required']
  },
  "brand": {
    type: String,
    required: [true, 'Equipment brand is required'],
  },
  "model": {
    type: String,
    required: [true, 'Equipment model is required'],
  },
  "usage": {
    type: String,
    required: [true, 'Equipment usage is required'],
  },
  "releaseYear": Number,
  "status": String,
  "system": String,
  "pricePerProbe": [{
    "numOfProbes": {
      type: Number,
      required: true
    },
    "from": {
      type: Number,
      required: true
    },
    "to": {
      type: Number,
      required: true
    },
    "minDeposite": {
      type: Number,
      required: true
    },
    "minInstallment": {
      type: Number,
      required: true
    }
  }],
  "warranty": String,
  "image": {
    type: String,
    default: 'no-image.jpg'
  },
  "reviewed": {
    type: Boolean,
    default: false
  },
  "technicalSpecs": {
    type: TechnicalSpecsSchema,
    default: () => ({})
  }
})

module.exports = mongoose.model('Equipment', EquipmentSchema)