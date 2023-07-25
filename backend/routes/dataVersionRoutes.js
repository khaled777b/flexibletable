const express = require('express');
const router = express.Router();
const dataVersionController = require('../controllers/dataVersionController');
const { authorizeTable, authorizeDataVersion } = require('../middlewares/authorization');
const dataVersionValidators = require('../validators/dataVersionValidators');
const { validateRequest } = require('../middlewares/requestValidation');
const { authenticate } = require('../middlewares/authentication');

// GET all data versions for a specific table
router.get('/:tableId/data-versions', authorizeTable, dataVersionController.getAllDataVersions);

// GET a specific data version
router.get(
  '/:tableId/data-versions/:versionId',
  authorizeDataVersion,
  dataVersionController.getDataVersion
);

// Create a new data version
router.post(
  '/:tableId/data-versions',
  authorizeTable,
  dataVersionValidators.createDataVersionRules,
  validateRequest,
  dataVersionController.createDataVersion
);

// Update an existing data version
router.put(
  '/:tableId/data-versions/:versionId',
  authorizeDataVersion,
  dataVersionValidators.updateDataVersionRules,
  validateRequest,
  dataVersionController.updateDataVersion
);

// Delete a data version
router.delete(
  '/:tableId/data-versions/:versionId',
  authorizeDataVersion,
  dataVersionController.deleteDataVersion
);

module.exports = router;
