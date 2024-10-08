const cloudinary = require('../config/cloudinary');

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return result.secure_url;
    } catch (error) {
        throw new error('Image upload failed' + error);
    }
};

module.exports = {uploadImage};