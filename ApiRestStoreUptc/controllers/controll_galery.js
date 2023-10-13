import galery from "../models/galery.js";



export const saveGalery = async (req, res) => {

    try {
        const newGallery = new galery(req.body);
        await newGallery.save();
        res.json({ message: "photo added" });
      } catch (error) {
        res.json({ message: error });
      }
};


