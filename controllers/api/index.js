const router = require('express').Router();

const postRoutes = require('./postsRoutes');
const userRoutes = require('./userRoutes');

router.use('/post', postRoutes);
router.use('/user', userRoutes);


module.exports = router;