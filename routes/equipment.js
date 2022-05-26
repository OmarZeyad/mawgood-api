const router = require('express').Router({ mergeParams: true })
const {
  getAllEquipment,
  addEquipment,
  getEquipment,
  updateEquipment,
  deleteEquipment,
  compareEquipment
} = require('../controllers/equipment')

router
  .route('/')
  .get(getAllEquipment)
  .post(addEquipment)

router
  .route('/:equipmentId')
  .get(getEquipment)
  .put(updateEquipment)
  .delete(deleteEquipment)

router
  .route('/:equipmentId/comparison')
  .get(compareEquipment)

module.exports = router