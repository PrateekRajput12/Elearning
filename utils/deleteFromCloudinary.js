import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (public_id, resourceType) => {
    try {
        if (!public_id) return;

        await cloudinary.uploader.destroy(public_id, {
            resource_type: resourceType,
        });
    } catch (error) {
        console.log("Cloudinary delete failed:", error.message);
    }
};

export default deleteFromCloudinary;
