const JobTitles = require('../models/job_titles');

const { handleResponse } = require('../utils/helper/handle-response');

exports.getJobTitleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const jobTitle = await JobTitles.findByPk(id);

    if (!jobTitle) {
      return handleResponse(res, {
        error: 'job title not found',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'job title found successfully.',
      jobTitle,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.createJobTitle = async (req, res, next) => {
  try {
    const { jobTitleData } = req.body;

    const jobTitle = await JobTitles.create(jobTitleData);

    if (!jobTitle) {
      return handleResponse(res, {
        error: 'Failed to create a new job title',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'job title successfully created.',
      jobTitle,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.fetchAllJobTitles = async (req, res, next) => {
  try {
    const jobTitles = await JobTitles.findAll();

    if (jobTitles.length === 0) {
      return handleResponse(res, {
        error: 'No job title found.',
        statusCode: 404,
      });
    }

    return handleResponse(res, {
      message: 'job title successfully created.',
      jobTitles,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.updateJobTitle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { jobTitleData } = req.body;

    let jobTitle = await JobTitles.findByPk(id);

    if (!jobTitle) {
      jobTitle = await JobTitles.create(jobTitle);
    } else {
      jobTitle.title_name = jobTitleData.title_name;
      await jobTitle.save();
    }

    return handleResponse(res, {
      message: 'job title was updated.',
      jobTitle,
    });
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};

exports.removeJobTitle = async (req, res, next) => {
  try {
    const { id } = req.params;

    let jobTitle = await JobTitles.findByPk(id);

    if (!jobTitle) {
      return handleResponse(res, {
        error: 'No job title found.',
        statusCode: 404,
      });
    }

    const deleteResult = await JobTitles.destroy({
      where: { id },
    });

    if (deleteResult === 1) {
      // The deletion was successful (1 row affected)
      return res.status(204).send();
    } else {
      // The deletion did not affect any rows (Job title not found)
      return handleResponse(res, {
        error: 'No job title found.',
        statusCode: 404,
      });
    }
  } catch (error) {
    return handleResponse(res, { error }, 500);
  }
};
