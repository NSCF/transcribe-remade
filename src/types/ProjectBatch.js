/**@typedef {number} Timestamp */

/**
 * @typedef {Object} ProjectBatch
 * @prop {?string} [projectBatchID]
 * @prop {?string} [projectID]
 * @prop {?number} [batchNumber] The number of the batch inside the project, eg Batch 1
 * @prop {?string} [coverImageURL] To have an image in the card for this batch
 * @prop {?number} [specimenCount] The number of specimen records in this batch
 * @prop {?number} [recordsCaptured] The number of records captured
 * @prop {?string} [capturedBy] The ID of the person who captured this batch
 * @prop {?Timestamp} [captureStartDate] 
 * @prop {?Timestamp} [captureEndDate]
 * @prop {?number} [recordsChecked] The number of records checked
 * @prop {?string} [checkedBy] The ID of the person who checked this batch
 * @prop {?Timestamp} [checkStartDate] 
 * @prop {?Timestamp} [checkEndDate]
 * 
 */

export default {}; //needed to make it a module...