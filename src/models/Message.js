const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },
    message: {
      type: Schema.Types.String,
    },
});

module.exports = messageSchema;