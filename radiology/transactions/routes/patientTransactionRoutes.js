import express from 'express'
const router = express.Router()
import {
    registerTr,
    getAllTransactions,
    deletePatientTr,
    getPatientTrById,
    updatePatientTr,
    getAllMR
  } from '../controllers/transactionController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerTr).get(protect, admin, getAllTransactions)
router.route('/getAllMR').get(protect, admin, getAllMR)
router.route('/test').get((req, res) => {
    res.json({msg:"ok"})
})
router
  .route('/:id')
  .delete(protect, admin, deletePatientTr)
  .get(protect, admin, getPatientTrById)
  .put(protect, admin, updatePatientTr)

export default router
