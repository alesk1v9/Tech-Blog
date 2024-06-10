const { Posts, Comments } = require('../../models');

const router = require('express').Router();

// GET ALL
router.get('/', async (req,res) => {
    try {
        const allPosts = await Posts.findAll({
            include: [
                { model: Comments, }
            ]
        });
        res.status(200).json(allPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findByPk(req.params.id, {
            include: [
                { model: Comments },
            ],
        });
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const post = await Posts.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id  
        });
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json(error)
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const post = await Posts.findByPk(req.params.id);
        if (!post) {
            res.status(404).json({ error: 'Post does not exist' });
        }
        await Posts.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;