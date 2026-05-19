import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Function to upload image
const uploadImg = async (file) => {
  try {
    const fileName = `blog-${file.originalname.split(".")[0]}_${Date.now()}`;
    
    const uploadStr = await new Promise((resolve, reject) => {
      const uploadd = cloudinary.v2.uploader.upload_stream(
        {
          public_id: fileName,
          folder: "blogs",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
          resource_type: "auto",
        },
        (err, result) => {
          if (err) {
            console.log('err', err);
            return reject(err);
          }
          if (result) {
            resolve(result);
          }
        }
      );
      uploadd.end(file.buffer);
    });
    
    return { image: uploadStr.secure_url, public_id: uploadStr.public_id };
  } catch (error) {
    console.log('error-->', error);
  }
};

// Function to delete image
const deleteImg = async (public_id) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(public_id, {
      resource_type: "image"
    });
    return result;
  } catch (error) {
    console.log('error in dlt-->', error);
  }
};

export { uploadImg, deleteImg };