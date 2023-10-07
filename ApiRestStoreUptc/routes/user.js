import express from 'express'
<<<<<<< HEAD
import {obtainAllUsers, saveUser, findUserById, deleteUser, loginUser, updatePassword, sendMailRecoveryPass, updateUser} from '../controllers/controll_user.js'
=======
import {obtainAllUsers, saveUser, findUserById, deleteUser, loginUser, updatePassword, sendMailRecoveryPass, loginAdminSeller} from '../controllers/controll_user.js'
>>>>>>> 62a87ce6bc0a7ed91158bbfdb4888441b921287c
const router = express.Router()



router.get('/', obtainAllUsers)
router.post('/', saveUser)
router.get('/:id', findUserById)
router.delete('/:id', deleteUser)
router.post('/login', loginUser)  
router.post('/login2', loginAdminSeller)  
router.post('/updatePassword', updatePassword)  
router.post('/sendEmail/:email', sendMailRecoveryPass)
router.put('/:id', updateUser)

export default router