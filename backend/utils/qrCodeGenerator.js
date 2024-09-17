const QRCode = require('qrcode');

const generateQRCode = async (userID) => {
  try {
    const url = await QRCode.toDataURL(userID);
    return url;
  } catch (err) {
    console.error('Error generating QR Code', err);
  }
};

module.exports = generateQRCode;