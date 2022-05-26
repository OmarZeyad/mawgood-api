const router = require('express').Router()
const {
  getAllOffers,
  addOffer,
  getOffer,
  updateOffer,
  deleteOffer
} = require('../controllers/offers')

router
  .route('/')
  .get(getAllOffers)
  .post(addOffer)

router
  .route('/:offerId')
  .get(getOffer)
  .put(updateOffer)
  .delete(deleteOffer)

module.exports = router