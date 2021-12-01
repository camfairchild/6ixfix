import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});

const Picture = mongoose.model('Picture', PictureSchema);
export default Picture;
