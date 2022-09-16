const express = require('express');
const router = express.Router();
const churches = require('../controllers/churches');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateChurch } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Church = require('../models/church');

router
  .route('/')
  .get(catchAsync(churches.index))
  .post(isLoggedIn, upload.array('image'), validateChurch, catchAsync(churches.addChurch));

router.get('/add-new', isLoggedIn, churches.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(churches.showChurch))
  .put(isLoggedIn, upload.array('image'), validateChurch, catchAsync(churches.updateChurch))
  .delete(isLoggedIn, catchAsync(churches.deleteChurch));

router.get('/:id/edit', isLoggedIn, catchAsync(churches.renderEditForm));

module.exports = router;
