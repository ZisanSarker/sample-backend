const express = require('express');
const { registerController,loginController } = require('../controllers/userController');
//Router Object
const router = express.Router();

//REGISTER || POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController);



module.exports = router;