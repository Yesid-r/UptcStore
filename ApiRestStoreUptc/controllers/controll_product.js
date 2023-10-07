import Category from '../models/Category.js'
import product from '../models/product.js'
import { uploadImage, deleteImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'

export const obtainAll = async (req, res) => {
    try {
        const products = await product.find();
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const saveProduct = async (req, res) => {
    const idCategoria = req.body.category;
    console.log(req.body)
   try {
       console.log(`category to search: ${idCategoria}`);
       const category = await Category.findById(idCategoria);

       if (category == null) {
           return res.status(404).json({
               "status": false,
               "message": "Category not found"
           });
       }

       const newProduct = new product(req.body);
       console.log(req.files)
       if (req.files?.image) {
           const result = await uploadImage(req.files.image.tempFilePath);

           newProduct.images = {
               public_id: result.public_id,
               secure_url: result.secure_url
           };

           // Elimina el archivo temporal después de cargarlo
           await fs.unlink(req.files.image.tempFilePath);
       }

       const dataProductSave = await newProduct.save();

       return res.status(200).json({
           "status": true,
           "dataProduct": dataProductSave
       });
   } catch (error) {
       return res.status(500).json({
           "status": false,
           "error": error.message
       });
   }
};
export const modifyProduct = async (req, res) => {
    try {
        const id = req.params.id
        const dataToModify = req.body
        console.log(req.files)
        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath);

            dataToModify.images = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };

            // Elimina el archivo temporal después de cargarlo
            await fs.unlink(req.files.image.tempFilePath);
        }
        const previusData = await product.findByIdAndUpdate(id, dataToModify)
        
        return res.status(200).json({
            "status": true,
            "previusData": previusData
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
   
}
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id
        const productDeleted = await product.findByIdAndDelete(id)
        return res.status(200).json({
            "status": true,
            "productDeleted": productDeleted
            
        })
        await deleteImage(productDeleted.images.public_id)
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export const findProductById = async (req, res) => {
    try {
        const id = req.params.id
        const dataProduct = await product.findById(id)
        
        return res.status(200).json({
            "status": true,
            "dataProduct": dataProduct
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export const realizarCompra = async (req, res) => {
    try {
        const items = req.body; 

        
        for (const item of items) {
            const product = await Product.findById(item._id);

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `No hay suficiente stock para ${product.name}` });
            }
        }

        
        

        
        for (const item of items) {
            const product = await product.findById(item._id);
            product.stock -= item.quantity;
            await product.save();
        }

        
        return res.status(200).json({ message: 'Compra realizada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const findBySubcategory = async (req, res) => {
    try {
        const subcategory = req.params.subcategory;
        const products = await product.find({ subcategory: { $regex: new RegExp(subcategory, 'i') } });
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
}
export const validateStock = async (req, res) => {
    try {
        const items = req.body; 

        
        for (const item of items) {
            const product = await product.findById(item._id);

            if (!product) {
                return res.status(404).json({success:false, message: 'Producto no encontrado' });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({success:false, message: `No hay suficiente stock para ${product.name}` });
            }
        }

        return res.status(200).json({ success: true,message: 'Compra realizada con éxito' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({success:false, message: 'Error interno del servidor' });
    }
}


