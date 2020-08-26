const express = require('express');

const router = express.Router();

const authCtrl = require('../controllers/auth');


router.post('/register', authCtrl.register);
router.post('/authentication', authCtrl.auth);
router.post('/refresh_token', authCtrl.refreshToken);
router.put('/logout', authCtrl.logout);



module.exports = router;