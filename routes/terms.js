const router = require('express').Router()
const {
  getAllTerms,
  addTerm,
  getTerm,
  updateTerm,
  deleteTerm
} = require('../controllers/terms')

router
  .route('/')
  .get(getAllTerms)
  .post(addTerm)

router
  .route('/:termId')
  .get(getTerm)
  .put(updateTerm)
  .delete(deleteTerm)

module.exports = router