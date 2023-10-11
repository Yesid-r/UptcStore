import product from '../models/product.js'



export const findGaleryById = async (req, res) => {
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