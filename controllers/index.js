const router = require('express').Router();

const dashboardRoutes =require('./dashboardRoutes.js');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;

