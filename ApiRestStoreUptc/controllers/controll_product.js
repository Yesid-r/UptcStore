import Category from '../models/Category.js'
import product from '../models/product.js'
import { uploadImage } from '../utils/cloudinary.js'
import fs from 'fs-extra'
export const obtainAll = async (req, res) => {
    try {
        const dataProducts = await product.find()
        return res.status(200).json({
            "status": true,
            "dataProducts": dataProducts
        })
    } catch (error) {
        return res.status(500).json({
            "status": false,
            "error": error
        })
    }
}

export const saveProduct = async (req, res) => {
    const idCategoria = req.body.category;

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


