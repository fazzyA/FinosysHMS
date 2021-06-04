import express from 'express'
const router = express.Router()
import {
  register,
  getPatientProfile,
  getPatients,
  deletePatient,
  getPatientById,
  updatePatient,
  getAllMR
} from '../controllers/patientController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(register).get(protect, admin, getPatients)
router.route('/getAllMR').get(getAllMR)
router
  .route('/profile')
  .get(protect, getPatientProfile)
router
  .route('/:id')
  .delete(protect, admin, deletePatient)
  .get(protect, admin, getPatientById)
  .put(protect, admin, updatePatient)

export default router
