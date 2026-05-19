import { deleteImg, uploadImg } from "../config/cloudinary.js";
import Blog from "../models/BlogSchema.js";

// Controller for creating a blog
const CreateBlog = async (req, res) => {
    try {
        console.log("Body Data:", req.body);
        const { title, content } = req.body;

        // Check if a file was uploaded
        if (req.file) {
            // Upload to Cloudinary using helper function
            const check = await uploadImg(req.file);
            
            // Create database object (Removed author for testing without login)
            const data1 = { 
                title, 
                content, 
                image: check.image, 
                public_id: check.public_id 
            };
            
            const blog = new Blog(data1);
            const data = await blog.save();
            
            return res.status(201).json({ status: true, message: 'Blog created successfully', data });
        } else {
            return res.status(400).json({ status: false, message: 'Image is required' });
        }

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

// Controller for deleting a blog
const DeleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        // 1. First find the blog in the database to get the public_id
        const findd = await Blog.findById(id);
        if (findd == null) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }
        
        // 2. Delete the image from Cloudinary
        const dltImg = await deleteImg(findd.public_id);
        console.log('Cloudinary Delete Result --->', dltImg);
        
        // 3. Then delete the blog from the database
        const blog = await Blog.findByIdAndDelete(id);
        console.log('Database Delete Result --->', blog);
        
        if (blog == null) {
            return res.status(404).json({ status: false, message: 'Blog not found' });
        }
        
        return res.status(200).json({ status: true, message: 'SUCCESSFULLY DELETED' });

    } catch (error) {
        return res.status(400).json({ status: false, message: error.message });
    }
};

export { CreateBlog, DeleteBlog };