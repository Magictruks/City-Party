const express = require('express');

const router = express.Router();

const authService = require('../services/jwt.service');

const userCtrl = require('../controllers/user');

router.get('/promoters', authService.authenticateToken, userCtrl.getPromoters);


router.get('/', authService.authenticateToken, userCtrl.get);
router.post('/', authService.authenticateToken, userCtrl.post);
router.get('/:id', authService.authenticateToken, userCtrl.getById);
router.put('/:id', authService.authenticateToken, userCtrl.put);
router.delete('/:id', authService.authenticateToken, userCtrl.delete);




module.exports = router;