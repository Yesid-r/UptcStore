import galery from "../models/galery.js";



export const saveGalery = async (req, res) => {
 const idCategoria = req.body.category;
     console.log(req.body)
     console.log('secure_url: '+ req.body.secure_url)
    try {
   

        const newProduct = new galery(req.body);

        if (req.body.secure_url) {


            newProduct.images = {
                public_id: req.body.public_id,
                secure_url: req.body.secure_url
            };

           
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


