const express =require('express')
const router = express.Router()

const controller = require('../controller/weatherController')

router.get('/getSortedCities/all',controller.getSortedCities )


module.exports = router