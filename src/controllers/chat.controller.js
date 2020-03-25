const Chat = require('./../models/Chat.js');
const {Message} = require('./../models/Message.js');
const Controller = require('../utils/controller');
const{ BadRequestError, ResourceNotFoundError } = require('./../utils/errors');

class ChatController {
    constructor() {
        this._controller = new Controller(Chat);
    }

    createChat = async (req, res, next) => {
        try {
            const {headers: {authorization: userId}, body} = req;
            res.send(await this._controller.create({...body, owner: userId}));
        } catch (e) {
            next(e);
        }
    };

    findChatById = async (req, res, next) => {
        try {
          req.chat = await this._controller.read( req.params.chatId);
          next();
        } catch (e) {
            next( e );
        }
    };

    deleteChatById = async (req, res, next) => {
        try {
            res.send(await this._controller.delete( req.params.id ));
        } catch (e) {
            next( e );
        }
    };

    joinToChat = async (req, res, next) => {
        try {
            const {headers: {authorization: userId}, chat} = req;
            chat.participants.push(userId);
            const savedChat = await chat.save();
            if (savedChat) {
                const chatWithOwner = await Chat.findOne(chat).populate('owner').populate('participants');
                return res.send(chatWithOwner);
            }
            new BadRequestError();
        } catch (e) {
            next(e);
        }
    };

    addMessageToChat = async (req, res, next) => {
        try {
            const {headers: {authorization: userId}, chat, body} = req;
            chat.messages.push(new Message({...body, authorId: userId}));
            const savedChat = await chat.save();
            if (savedChat) {
                return res.send(savedChat);
            }
            new BadRequestError();
        } catch (e) {
            next(e);
        }
    };

    getChat = async (req, res, next) => {
        try {
            const chat = await Chat.findById(req.params.chatId).
            populate('participants', {
                chats: 0,
            }).populate('owner', {
                chats: 0,
            });
            if (chat) {
                return res.send(chat);
            }
            new ResourceNotFoundError();
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new ChatController();