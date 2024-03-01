const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dbcopekhr', 
    api_key: '865393329238635', 
    api_secret: 'Tset03WWf9U6m5CJUfwGBam5noU',
});

module.exports = cloudinary;
