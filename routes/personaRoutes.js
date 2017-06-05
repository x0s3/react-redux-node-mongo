var express = require('express');
var router = express.Router();
var personaController = require('../controllers/personaController.js');

/*
 * GET
 */
router.get('/users', personaController.list);

/**
 *  GET
 */
router.get('/users/excel',personaController.excel);

/*
 * GET
 */
router.get('/users/:id', personaController.show);

/*
 * POST
 */
router.post('/users', personaController.create);

/*
 * PUT
 */
router.put('/users/:id', personaController.update);

/*
 * DELETE
 */
router.delete('/users/:id', personaController.remove);

module.exports = router;
