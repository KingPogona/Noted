const router = require('express').Router();
const notesRoutes = require('../apiRoutes/notesRoutes.js');

router.use(notesRoutes);
// router.use(require('./notesRoutes.js'));

module.exports = router;