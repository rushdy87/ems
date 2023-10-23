const express = require('express');

const WorkDayController = require('../controllers/work_day');

const route = express.Router();
// get work day by id ('/workday/:i')
route.get('/:id', WorkDayController.getWorkdayById);

// get all workdays ('/workday')
route.get('/', WorkDayController.fetchAllWorkdays);

// Add new workday ('/workday')
route.post('/', WorkDayController.addWorkday);

// edit workday ('/workday/:i')
route.patch('/:id', WorkDayController.editWorkday);

// Remove workday ('/workday/:i')
route.delete('/:id', WorkDayController.deleteWorkday);

module.exports = route;
