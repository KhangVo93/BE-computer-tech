const express = require("express");

const router = express.Router();

const { createReplyComment, getAllReplyCommentOfComment } = require("../controllers/ReplyCommentController")

router.post('/:commentId/createComment',createReplyComment)
router.get('/:commentId/getComment',getAllReplyCommentOfComment);

module.exports = router;