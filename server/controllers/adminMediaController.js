const { cloudinary, isConfigured } = require("../config/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    if (!isConfigured()) {
      return res.status(500).json({ message: "Cloudinary is not configured" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "qrdine", resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    return res.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
    });
  } catch (error) {
    return res.status(500).json({ message: "Upload failed", error: error.message });
  }
};
