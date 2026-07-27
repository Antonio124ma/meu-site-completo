const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getPhotos,
  createPhoto,
  updatePhoto,
  deletePhoto,
} = require('../controllers/photo.controller');

router.get('/', getPhotos);
router.post('/', auth, upload.single('image'), createPhoto);
router.put('/:id', auth, upload.single('image'), updatePhoto);
router.delete('/:id', auth, deletePhoto);

module.exports = router;
