// Cloudinary
// Require packages
const   cloudinary            =   require("cloudinary").v2,
        { CloudinaryStorage } =   require('multer-storage-cloudinary'),
        multer                =   require("multer");

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Storage Setups
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "YelpCamp",
      format: async (req, file) => {
          "jpg", "jpeg", "png"
        }
    },
  });
const upload = multer({ storage: storage });

// Export module
module.exports = upload;