

import Category from '../models/Category.js'
import product from '../models/product.js'

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
    const idCategoria = req.body.category
    console.log(req.body)
    try {
        console.log(`category to search: ${idCategoria}`)
        const category = await Category.findById(idCategoria)
        console.log(category)
        if (category == null) {
            return res.status(404).json({
                "status": false,
                "message": "Category not found"
            })
        }
        const productJSON = new product(req.body)
        const dataProductSave = await productJSON.save()
        return res.status(200).json({
            "status:": true,
            "dataProduct": dataProductSave,
        })
    } catch (error) {
        return res.status(200).json({
            "status": false,
            "error": error
        })
    }
}
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


