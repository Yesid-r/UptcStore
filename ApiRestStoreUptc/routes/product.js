import express from 'express'
const router = express();
<<<<<<< HEAD
import {obtainAll, saveProduct, modifyProduct, deleteProduct, findProductById, realizarCompra, findBySubcategory, validateStock} from '../controllers/controll_product.js'
=======
import {obtainAll, saveProduct, modifyProduct, deleteProduct, findProductById} from '../controllers/controll_product.js'
import fileUpload from 'express-fileupload'
>>>>>>> 62a87ce6bc0a7ed91158bbfdb4888441b921287c

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
router.post('/realizarCompra', realizarCompra)
router.get('/category/:subcategory', findBySubcategory)
router.get('/subcategory/:subcategory', findBySubcategory)
router.get('/validateStock', validateStock)



export default router