const QRCode = require('qrcode');

const generateQRCode = async (email) => {
    try {
        const url = await QRCode.toDataURL(email);
        return url;
    } catch (err) {
        console.error('Error generating QR Code', err);
        return null;
    }
};

module.exports = generateQRCode;