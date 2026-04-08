import { cloudinary } from "../config/cloudinary.js";
import streamifier from "streamifier";

function uploadToCloudinary(buffer, options) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

export async function uploadCover(req, res) {
  try {
    console.log("Cover upload hit — file:", req.file?.originalname);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded."
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "audify/covers",
      transformation: [{ width: 500, height: 500, crop: "fill" }],
    });

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });

  } catch (error) {
    console.log("Cover upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed: " + error.message
    });
  }
}

export async function uploadAudioFile(req, res) {
  try {
    console.log("Audio upload hit — file:", req.file?.originalname);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded."
      });
    }

    const result = await uploadToCloudinary(req.file.buffer, {
      folder: "audify/audio",
      resource_type: "video",
    });

    res.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });

  } catch (error) {
    console.log("Audio upload error:", error);
    res.status(500).json({
      success: false,
      message: "Upload failed: " + error.message
    });
  }
}