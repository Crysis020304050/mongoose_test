const express = require('express');
const ChatController = require('../controllers/chat.controller.js');
const UserController = require('../controllers/user.controller.js');

const chatRouter = express.Router();

chatRouter.route('/chat(/:chatId)?')
    .post(ChatController.createChat)
    .get(ChatController.getChat);

chatRouter.route('/chat/:chatId/participants')
    .post(ChatController.findChatById,
        UserController.fundUserById,
        ChatController.joinToChat);

chatRouter.route('/chat/:chatId/message(/:messageId)?')
    .post(ChatController.findChatById,
        ChatController.addMessageToChat);

module.exports = chatRouter;