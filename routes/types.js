const brandsRouter = require('./brands')
const equipmentRouter = require('./equipment')

const router = require('express').Router()
const {
  getTypes,
  addType
} = require('../controllers/types')

router.use('/:typeName/brands', brandsRouter)
router.use('/:typeName/equipment', equipmentRouter)

router
  .route('/')
  .get(getTypes)
  .post(addType)

module.exports = router