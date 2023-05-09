/**@typedef {number} Timestamp*/

/**
 * @typedef {Object} Project
 * @prop {?string} [projectID]
 * @prop {?string} [projectName]
 * @prop {boolean} [isCoreFieldsProject] Whether or not we only record core fields on this project
 * @prop {?string} [notes] Specific notes or instructions for this project, e.g. which fields to capture
 * @prop {boolean} [isActive] An indicator for whether this project can be worked on. Use for keeping projects on hold...
 * @prop {?string} [createdBy]
 * @prop {?Timestamp} [createdDate]
 * @prop {?number} [specimenCount]
 * @prop {?number} [batchSize]
 * @prop {?number} [batchCount]
 * @prop {?number} [capturedRecordCount]
 * @prop {?number} [checkedRecordCount]
 * @prop {?boolean} [isCompleted]
 * @prop {?string} [completedBy]
 * @prop {?Timestamp} [completedDate]
 */

export default {}; //needed to make it a module...