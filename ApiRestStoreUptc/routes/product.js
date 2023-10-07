import express from 'express'
const router = express();
import {obtainAll, saveProduct, modifyProduct, deleteProduct, findProductById, realizarCompra, findBySubcategory, validateStock} from '../controllers/controll_product.js'

router.get('/', obtainAll)
router.post('/', saveProduct)
router.put('/:id', modifyProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', findProductById)
router.post('/realizarCompra', realizarCompra)
router.get('/category/:subcategory', findBySubcategory)
router.get('/subcategory/:subcategory', findBySubcategory)
router.get('/validateStock', validateStock)



export default router