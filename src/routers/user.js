const express = require('express');
const UserController = require('../controllers/user.controller.js');

const userRouter = express.Router();

userRouter.route('user')
    .post(UserController.createUser)
    .get(UserController.getUserById)
    .patch(UserController.updateUserById)
    .delete(UserController.deleteUserById);

module.exports = userRouter;
