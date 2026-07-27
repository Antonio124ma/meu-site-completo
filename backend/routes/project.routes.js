const router = require('express').Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');

router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', auth, upload.single('image'), createProject);
router.put('/:id', auth, upload.single('image'), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
