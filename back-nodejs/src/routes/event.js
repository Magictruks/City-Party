const express = require('express');

const router = express.Router();

const authService = require('../services/jwt.service');
const eventCtrl = require('../controllers/event');

router.get('/category/:id', authService.authenticateToken, eventCtrl.getByEventCategory)

router.get('/favourite-and-participate/:event_id', authService.authenticateToken, eventCtrl.getFavoriteAndParticipate)
router.get('/favorite', authService.authenticateToken, eventCtrl.getFavorite)
router.post('/favorite/:event_id', authService.authenticateToken, eventCtrl.setFavorite)
router.post('/participate/:event_id', authService.authenticateToken, eventCtrl.setParticipate)


router.get('/', authService.authenticateToken, eventCtrl.get);
router.post('/', authService.authenticateTokenAdmin, eventCtrl.post);
router.get('/:id', authService.authenticateToken, eventCtrl.getByEventCategory);
router.put('/:id', authService.authenticateTokenAdmin, eventCtrl.put);
router.delete('/:id', authService.authenticateTokenAdmin, eventCtrl.delete);
router.get('/:latitude/:longitude', authService.authenticateToken, eventCtrl.getByProximity)



module.exports = router;