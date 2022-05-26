const Term = require('../models/Term')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getAllTerms = asyncHandler(async (req, res) => {
  const terms = await Term.find({})

  res.status(200).json({
    success: true,
    count: terms.length,
    data: terms
  })
})

exports.addTerm = asyncHandler(async (req, res, next) => {
  const term = await Term.create(req.body)

  res.status(201).json({
    success: true,
    data: term
  })
})

exports.getTerm = asyncHandler(async (req, res, next) => {
  const term = await Term.findById(req.params.termId)

  if (!term) {
    return next(new ErrorResponse(`Term with ID '${req.params.termId}' is not found!`, 404))
  }

  res.status(200).json({
    success: true,
    data: term
  })
})

exports.updateTerm = asyncHandler(async (req, res, next) => {
  const term = await Term.findByIdAndUpdate(
    req.params.termId,
    req.body,
    { new: true, runValidators: true }
  )

  if (!term) {
    return next(new ErrorResponse(`Term with ID '${req.params.termId}' is not found!`, 404))
  }

  res.status(200).json({
    success: true,
    data: term
  })
})

exports.deleteTerm = asyncHandler(async (req, res, next) => {
  const term = await Term.findByIdAndDelete(req.params.termId)

  if (!term) {
    return next(new ErrorResponse(`Term with ID '${req.params.termId}' is not found!`, 404))
  }

  res.status(200).json({
    success: true
  })
})