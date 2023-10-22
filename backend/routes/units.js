const express = require('express');

const UnitsController = require('../controllers/units');

const route = express.Router();

// getUnitById '/units/:id'
route.get('/:id', UnitsController.getUnitById);

// addUnit '/units'
route.post('/', UnitsController.addUnit);

// fetchAllUnits '/units'
route.get('/', UnitsController.fetchAllUnits);

// updateunit
route.patch('/:id', UnitsController.EditUnit);

// deleteUnit '/units/:id'
route.delete('/:id', UnitsController.deleteUnit);
module.exports = route;
