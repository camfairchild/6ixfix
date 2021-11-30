import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
    time_: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false,
    }
});

const Message = mongoose.model('Message', MessageSchema);
export default Message;