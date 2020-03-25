const express = require('express');
const ChatController = require('../controllers/chat.controller.js');

const chatRouter = express.Router();

chatRouter.route('/chat(/:chatId)?')
    .post(ChatController.createChat)
    .get(ChatController.getChat);

chatRouter.route('/chat/:chatId/participants')
    .post(ChatController.findChatById,
        ChatController.joinToChat);

chatRouter.route('/chat/:chatId/message(/:messageId)')
    .post();

module.exports = chatRouter;