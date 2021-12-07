import mongoose from 'mongoose';

const HelpFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const HelpForm = mongoose.model('HelpForm', HelpFormSchema);
export default HelpForm;