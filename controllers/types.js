const Type = require('../models/Type')
const asyncHandler = require('../middleware/asyncHandler')

exports.getTypes = asyncHandler(async (req, res, next) => {
  // const types = await Type.find({}).select({ "name": 1, "image": 1, "_id": 0 })
  const types = await Type.find({}).sort('rank')

  res.status(200).json({
    success: true,
    count: types.length,
    data: types
  })
})

exports.addType = asyncHandler(async (req, res, next) => {
  const type = await Type.create(req.body)

  res.status(201).json({
    success: true,
    data: type
  })
})