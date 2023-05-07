/**@typedef {number} Timestamp*/

/**
 * @typedef {Object} Specimen
 * @prop {?string} [projectID]
 * @prop {?string} [batchNumber]
 * @prop {?string} [specimenID] An identifier for the dwc:Occurrence / collecting event / series, because barcodes are often unique to sheets...
 * @prop {boolean} [isCoreFields] 
 * @prop {?string} [barcodes]
 * @prop {?string} [accessionNumber]
 * @prop {?string} [primaryCollector]
 * @prop {?string} [collectorNumber]
 * @prop {?string} [additionalCollectors]
 * @prop {?number} [collectDay]
 * @prop {?number} [collectMonth]
 * @prop {?number} [collectYear]
 * @prop {?string} [currentName] The latest name on the specimen
 * @prop {?string} [typeName] The name that this is a type for, if different to currentName
 * @prop {?string} [qualifier]
 * @prop {?string} [typeStatus]
 * @prop {?string} [detBy]
 * @prop {?number} [detDay]
 * @prop {?number} [detMonth]
 * @prop {?number} [detYear]
 * @prop {?string} [detNotes]
 * @prop {?string} [country]
 * @prop {?string} [province]
 * @prop {?string} [locality]
 * @prop {?string} [coordinates]
 * @prop {?string} [qds]
 * @prop {?string} [altitude]
 * @prop {boolean} [isCultivated]
 * @prop {?string} [habitat]
 * @prop {?string} [generalNotes]
 * @prop {?string} [capturedBy]
 * @prop {?Timestamp} [capturedDate]
 * @prop {?string} [checkedBy]
 * @prop {?Timestamp} [checkedDate]
 * 
 */

export default {}; //needed to make it a module...