import express from 'express'
const router = express();
import {obtainAll, saveProduct, modifyProduct, deleteProduct, findProductById} from '../controllers/controll_product.js'

router.get('/', obtainAll)
router.post('/', saveProduct)
router.put('/:id', modifyProduct)
router.delete('/:id', deleteProduct)
router.get('/:id', findProductById)

export default router