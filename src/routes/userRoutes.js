const express = require('express');
const {registerController} = require('../controllers/userController');
//Router Object
const router = express.Router();

//REGISTER || POST
router.post('/register',registerController)



module.exports = router;