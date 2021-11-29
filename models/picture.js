import mongoose from 'mongoose';

const PictureSchema = new mongoose.Schema({
    picture: {
        mimetype: String,
        data: Buffer
    },
    caption: {
        type: String,
        trim: true
    },
});

const Picture = mongoose.model('Picture', PictureSchema);
export default Picture;
