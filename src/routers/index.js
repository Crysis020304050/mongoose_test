const express = require('express');
const userRouter = require('./user.js');
const chatRouter = require('./chat.js');

const router = express.Router();

router.use(userRouter);
router.use(chatRouter);

module.exports = router;

