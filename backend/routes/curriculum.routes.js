const router = require('express').Router();
const auth = require('../middleware/auth');
const { getCurriculum, updateCurriculum } = require('../controllers/curriculum.controller');

router.get('/', getCurriculum);
router.put('/', auth, updateCurriculum);

module.exports = router;
