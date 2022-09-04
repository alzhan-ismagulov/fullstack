const express = require('express')
const controller = require('../controllers/category')
const passport = require('passport')
const router = express.Router()


router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll) //Роут защищён паспортом
router.get('/:id', controller.getById)
router.delete('/:id', controller.remove)
router.post('/', controller.create)
router.post('/:id', controller.update)




module.exports = router