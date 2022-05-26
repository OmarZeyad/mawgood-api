const Offer = require('../models/Offer')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

exports.getAllOffers = asyncHandler(async (req, res) => {
  const offers = await Offer.find({})

  res.status(200).json({
    success: true,
    count: offers.length,
    data: offers
  })
})

exports.addOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.create(req.body)

  res.status(201).json({
    success: true,
    data: offer
  })
})

exports.getOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findById(req.params.offerId)

  if (!offer) {
    return next(new ErrorResponse(`Offer with ID '${req.params.offerId}' is not found!`, 404))
  }

  res.status(200).json({
    success: true,
    data: offer
  })
})

exports.updateOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findByIdAndUpdate(
    req.params.offerId,
    req.body,
    { new: true, runValidators: true }
  )

  if (!offer) {
    return next(new ErrorResponse(`Offer with ID '${req.params.offerId}' is not found!`, 404))
  }

  res.status(200).json({
    success: true,
    data: offer
  })
})

exports.deleteOffer = asyncHandler(async (req, res, next) => {
  const offer = await Offer.findByIdAndDelete(req.params.offerId)

  if (!offer) {
    return next(new ErrorResponse(`Offer with ID '${req.params.offerId}' is not found!`, 404))
  }

  res.status(200).json({
    success: true
  })
})