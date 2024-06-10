const router = require('express').Router();
const { Posts, Comments, User } = require('../models');
const isAuth = require('../utils/isAuth');

router.get('/', async (req,res) => {
    try {
        const posts = await Posts.findAll({
            attributes: ['title', 'content', 'date_created', 'user_id'],
            raw: true,
            nest: true
        });
        return res.render('homepage', { posts });
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/login', (req,res) => {
    return res.render('login')
});

router.get('/dashboard', isAuth ,async (req,res) => {
    
    try {
        const user = await User.findByPk(req.session.user_id);
        const posts = await Posts.findAll({
            include: [{
                model: User,
                attributes: ['name']
            }, {
                model: Comments
            }],
            where: {
                user_id: req.session.user_id
            },
            raw: true,
            nest: true
        });
        return res.render('dashboard', { posts, user });
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;