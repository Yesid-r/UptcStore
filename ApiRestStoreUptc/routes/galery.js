import express from 'express'
const router = express.Router()

import  {findCategoryById, addProductToCategory, deleteCategory} from '../controllers/controll_category.js'


router.get('/:id', findCategoryById)
router.put('/:id', addProductToCategory)
router.delete('/:id', deleteCategory)


export default router