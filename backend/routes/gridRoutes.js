const express = require('express')
const router = express.Router()
const {getGridData, setGridData} = require('../controllers/gridController')

router.route('/').get(getGridData).post(setGridData)

module.exports = router
