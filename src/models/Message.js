const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../db');

const messageSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    /*chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },*/
    message: {
      type: Schema.Types.String,
    },
});

const Message = db.model('Message', messageSchema);

module.exports = {
    messageSchema,
    Message,
};