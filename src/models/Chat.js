const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db');
const messageSchema = require('./Message.js');

const chatSchema = new Schema({
        name: {
            type: Schema.Types.String,
            minLength: 4,
            maxLength: 20,

        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

        messages: [messageSchema]

    });

const Chat = db.model('Chat', chatSchema);

module.exports = Chat;