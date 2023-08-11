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
 * @prop {?number} [specimenCount] The total number of specimens/images in the project
 * @prop {?number} [batchSize] The number of specimen records per batch
 * @prop {?number} [batchCount] The number of batches in the project
 * @prop {?number} [batchesCaptured] The number of batches where data capture is completed
 * @prop {?number} [batchesChecked] The number of batches where QC is completed
 * @prop {?number} [capturedRecordCount] The total number of specimens/images captured
 * @prop {?number} [checkedRecordCount] The total number of specimens/images quality controlled
 * @prop {?boolean} [isCompleted] Whether the project has been completed/closed
 * @prop {?string} [completedBy]
 * @prop {?Timestamp} [completedDate]
 * @prop {?Object} [participants]
 */

export default {}; 