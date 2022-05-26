const equipmentRouter = require('./equipment')

const router = require('express').Router({ mergeParams: true })
const {
  getBrands,
  addBrand
} = require('../controllers/brands')

router.use('/:brandName/equipment', equipmentRouter)

router
  .route('/')
  .get(getBrands)
  .post(addBrand)

module.exports = router