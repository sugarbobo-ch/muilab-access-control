const router = require('express').Router()
const ctrl = require('../controllers/log_controller')

router.route('/log')
  .get(ctrl.getCurrentCount)

router.route('/log')
  .post(ctrl.setCurrentCount)

router.route('/log')
  .put(ctrl.addLog)
module.exports = router
