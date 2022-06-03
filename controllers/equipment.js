const Equipment = require('../models/Equipment')
const Type = require('../models/Type')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getAllEquipment = asyncHandler(async (req, res, next) => {
  const excludedFields = ['select', 'sort', 'page', 'limit']
  let filter = { reviewed: true }
  let fields = { "technicalSpecs": 0 }

  // filter by type
  const equipmentType = req.params.typeName
  if (equipmentType) {
    const type = await Type.findOne({ name: equipmentType })
    if (!type) return next(new ErrorResponse(`Type '${equipmentType}' not found!`, 404))

    filter = { ...filter, type: equipmentType }
  }

  // filter by brand
  const equipmentBrand = req.params.brandName
  if (equipmentBrand) {
    const brand = await Type.findOne({ "brands.name": equipmentBrand })
    if (!brand) return next(new ErrorResponse(`Brand '${equipmentBrand}' not found!`, 404))

    filter = { ...filter, brand: equipmentBrand }
  }

  // search
  let reqQuery = { ...req.query }
  excludedFields.forEach(field => delete reqQuery[field])

  reqQuery = JSON.stringify(reqQuery)
  reqQuery = reqQuery.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

  filter = { ...filter, ...JSON.parse(reqQuery) }

  let mongooseQuery = Equipment.find(filter)

  // project selected fields
  if (req.query.select) {
    fields = {}
    req.query.select.split(',').forEach(field => fields[field] = 1)
  }

  mongooseQuery = mongooseQuery.select(fields)

  // sort results
  if (req.query.sort) {
    const by = req.query.sort.split(',').join(' ')
    mongooseQuery = mongooseQuery.sort(by)
  } else {
    mongooseQuery = mongooseQuery.sort('pricePerProbe.from')
  }

  // limiting and pagination
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  const totalDocs = await Equipment.countDocuments()
  const startIdx = (page - 1) * limit
  const endIdx = page * limit

  mongooseQuery = mongooseQuery.skip(startIdx).limit(limit)

  const pagination = { limit, totalDocs }
  if (startIdx > 0) { pagination.prev = { page: page - 1 } }
  if (endIdx < totalDocs) { pagination.next = { page: page + 1 } }

  // execute mongoose query
  const allEquipment = await mongooseQuery

  res.status(200).json({
    success: true,
    count: allEquipment.length,
    pagination: pagination,
    data: allEquipment
  })
})

exports.addEquipment = asyncHandler(async (req, res, next) => {
  const submittedEquipment = req.body

  const type = await Type.findOne({ name: submittedEquipment.type })
  if (!type) {
    return next(new ErrorResponse(`Type '${submittedEquipment.type}' is not supported!`, 404))
  }

  // const brands = type.brands.map(brand => brand.name)
  // if (!brands.includes(submittedEquipment.brand)) {
  //   return next(new ErrorResponse(`Brand '${submittedEquipment.brand}' is not supported for type '${submittedEquipment.type}'!`, 404))
  // }

  const equipment = await Equipment.create(submittedEquipment)

  res.status(201).json({
    success: true,
    data: equipment
  })
})

exports.getEquipment = asyncHandler(async (req, res, next) => {
  const equipment = await Equipment.findById(req.params.equipmentId)

  if (!equipment) {
    return next(new ErrorResponse(`Equipment with ID '${req.params.equipmentId}' not found!`, 404))
  }

  res.status(200).json({
    success: true,
    data: equipment
  })
})

exports.updateEquipment = asyncHandler(async (req, res, next) => {
  const equipment = await Equipment.findByIdAndUpdate(
    req.params.equipmentId,
    req.body,
    { new: true, runValidators: true }
  )

  if (!equipment) {
    return next(new ErrorResponse(`Equipment with ID '${req.params.equipmentId}' not found!`, 404))
  }

  res.status(200).json({
    success: true,
    data: equipment
  })
})

exports.deleteEquipment = asyncHandler(async (req, res, next) => {
  const equipment = await Equipment.findByIdAndDelete(req.params.equipmentId)

  if (!equipment) {
    return next(new ErrorResponse(`Equipment with ID '${req.params.equipmentId}' not found!`, 404))
  }

  res.status(200).json({
    success: true
  })
})

exports.compareEquipment = asyncHandler(async (req, res, next) => {
  const comparedIds = [req.params.equipmentId].concat(req.body.otherEquipment)
  const comparedEquipment = await Equipment.find({ '_id': { $in: comparedIds } })

  res.status(200).json({
    success: true,
    count: comparedEquipment.length,
    data: comparedEquipment
  })
})