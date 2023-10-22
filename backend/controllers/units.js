const Units = require('../models/units');
const { handleResponse } = require('../utils/helper/handle-response');

exports.getUnitById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const unit = await Units.findByPk(id);

    if (!unit) {
      return handleResponse(res, {
        error: 'Unit not found',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'Unit found successfully.',
      unit,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.addUnit = async (req, res, next) => {
  try {
    const { unit_name } = req.body;

    const unit = await Units.create({ unit_name });

    if (!unit) {
      return handleResponse(res, {
        error: 'Failed to create a new unit.',
        statusCode: 500,
      });
    }

    return handleResponse(res, {
      message: 'Unit successfully created.',
      unit,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.fetchAllUnits = async (req, res, next) => {
  try {
    const units = await Units.findAll();

    if (units.length === 0) {
      return handleResponse(res, {
        error: 'No units found.',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'Units found successfully.',
      units,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.EditUnit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newData } = req.body;

    const unit = await Units.findByPk(id);
    if (!unit) {
      return handleResponse(res, {
        error: 'Unit not found.',
        statusCode: 404,
      });
    }

    unit.unit_name = newData.unit_name;

    await unit.save();
    return handleResponse(res, {
      message: 'Unit updated successfully.',
      unit,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.deleteUnit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const unit = await Units.findByPk(id);

    if (!unit) {
      return handleResponse(res, {
        error: 'Unit not found.',
        statusCode: 404,
      });
    }

    const deletionResult = await Units.destroy({
      where: { id },
    });

    if (deletionResult === 1) {
      return res.status(204).send();
    } else {
      return handleResponse(res, {
        error: 'Unit not found.',
        statusCode: 404,
      });
    }
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};
