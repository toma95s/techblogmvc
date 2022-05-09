const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// check the session and use the id from the session. 
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            Comment_text: req.body.Comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
            });
    }
});

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment was found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;