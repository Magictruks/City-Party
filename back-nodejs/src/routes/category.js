const express = require('express');

const router = express.Router();

const authService = require('../services/jwt.service');
const categoryCtrl = require('../controllers/category');

router.get('/', authService.authenticateToken, categoryCtrl.get);
router.post('/', authService.authenticateTokenAdmin, categoryCtrl.post);
router.get('/:id', authService.authenticateToken, categoryCtrl.getById);
router.put('/:id', authService.authenticateTokenAdmin, categoryCtrl.put);
router.delete('/:id', authService.authenticateTokenAdmin, categoryCtrl.delete);
router.get('/:latitude/:longitude', authService.authenticateToken, categoryCtrl.getByProximity)



module.exports = router;