import express from 'express'
const router = express();
import {obtainAll, saveProduct, modifyProduct, deleteProduct, findProductById} from '../controllers/controll_product.js'
import fileUpload from 'express-fileupload'

router.get('/', obtainAll)
router.post('/',fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), saveProduct)
router.put('/:id', fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
}), modifyProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', findProductById)



export default router