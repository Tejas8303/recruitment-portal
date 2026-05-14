const Project = require("../models/Project");
const Application = require("../models/Application");

/**
 * Pre-middleware for file upload routes.
 * Resolves projectCode and next serialNumber from ?projectId query param
 * BEFORE Multer runs, so diskStorage.destination() can use them synchronously.
 *
 * Attaches to req:
 *   req.resolvedProjectCode   e.g. "AI001"
 *   req.resolvedSerialNumber  e.g. 4
 */
module.exports = async (req, res, next) => {
  try {
    const projectId = req.query.projectId || req.body.projectId;

    if (!projectId) {
      return next();
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const count = await Application.countDocuments({ project: projectId });

    req.resolvedProjectCode  = project.projectCode;
    req.resolvedSerialNumber = count + 1;

    next();
  } catch (err) {
    console.error("resolveProject middleware error:", err);
    next(err);
  }
};
