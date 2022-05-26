const Type = require('../models/Type')

const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getBrands = asyncHandler(async (req, res, next) => {
  const filter = req.params.typeName ? { name: req.params.typeName } : {}
  const types = await Type.find(filter).select({ "brands._id": 0 })
  if (types.length === 0) {
    return next(new ErrorResponse(`Type '${req.params.typeName}' not found!`, 404))
  }

  const brands = types.map(type => [...type.brands]).flat()

  res.status(200).json({
    success: true,
    count: brands.length,
    data: brands
  })
})

exports.addBrand = asyncHandler(async (req, res, next) => {
  if (!req.params.typeName) {
    return next(new ErrorResponse('Select a type first', 400))
  }

  const type = await Type.findOneAndUpdate(
    { name: req.params.typeName },
    { $push: { brands: req.body } },
    { new: true, runValidators: true }
  )

  if (!type) {
    return next(new ErrorResponse(`Type '${req.params.typeName}' not found!`, 404))
  }

  res.status(201).json({
    success: true,
    data: type
  })
})