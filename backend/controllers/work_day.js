const WorkDay = require('../models/work_day');

const { handleResponse } = require('../utils/helper/handle-response');

exports.getWorkdayById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workday = await WorkDay.findByPk(id);

    if (!workday) {
      return handleResponse(res, {
        error: 'Workday not found',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'Workday found successfully.',
      workday,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.fetchAllWorkdays = async (req, res, next) => {
  try {
    const workdays = await WorkDay.findAll();
    if (workdays.length === 0) {
      return handleResponse(res, {
        error: 'No workday found.',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'Workdays found successfully.',
      workdays,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.addWorkday = async (req, res, next) => {
  try {
    const { name } = req.body;

    const workday = await WorkDay.create({ name });

    if (!workday) {
      return handleResponse(res, {
        error: 'Failed to create a new workday.',
        statusCode: 500,
      });
    }

    return handleResponse(res, {
      message: 'Workday successfully created.',
      workday,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.editWorkday = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newData } = req.body;

    const workday = await WorkDay.findByPk(id);

    if (!workday) {
      return handleResponse(res, {
        error: 'Workday not found.',
        statusCode: 404,
      });
    }

    workday.name = newData.name;

    await workday.save();
    return handleResponse(res, {
      message: 'Workday updated successfully.',
      workday,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.deleteWorkday = async (req, res, next) => {
  try {
    const { id } = req.params;

    const workday = await WorkDay.findByPk(id);
    if (!workday) {
      return handleResponse(res, {
        error: 'Workday not found.',
        statusCode: 404,
      });
    }

    const deletionResult = await WorkDay.destroy({
      where: { id },
    });

    if (deletionResult === 1) {
      return res.status(204).send();
    } else {
      return handleResponse(res, {
        error: 'Workday not found.',
        statusCode: 404,
      });
    }
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};
