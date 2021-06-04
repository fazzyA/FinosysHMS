import asyncHandler from 'express-async-handler'
import PatientTr from '../models/patientTransactionModel.js'
import Patient from '../models/patientModel.js'

// @desc    Register a new patient transaction
// @route   POST /api/transaction/
// @access  Public
const registerTr = asyncHandler(async (req, res) => {
  const { pid,status, condition, dept,drReffered, notes, tests,MRno,service } = req.body


  const patient = await PatientTr.create({
    pid,status, condition, dept,drReffered, notes, tests ,MRno,service
  })

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      pid: patient.pid,
    })
  } else {
    res.status(400)
    throw new Error('Invalid patient data')
  }
})


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllTransactions = asyncHandler(async (req, res) => {
  const users = await PatientTr.find({})
   .populate('Patient','age')
  res.json(users)
})


// @desc    Get all patient MR#
// @route   GET /api/transaction/getAllMR
// @access  Private/Admin
const getAllMR = asyncHandler(async (req, res) => {
    const users = await PatientTr.find({}).populate('Patient','MRno')
    res.json(users)
  })
  



// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deletePatientTr = asyncHandler(async (req, res) => {
  const user = await PatientTr.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'Patient entry removed' })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getPatientTrById = asyncHandler(async (req, res) => {
  const user = await PatientTr.findById(req.params.id)

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updatePatientTr = asyncHandler(async (req, res) => {
  const user = await PatientTr.findById(req.params.id)

  if (user) {
    user.status = req.body.status || user.status
    user.condition = req.body.condition || user.condition
    user.notes = req.body.notes || user.notes
    user.drReffered = req.body.drReffered || user.drReffered
    user.tests = req.body.tests || user.tests
    user.dept = req.body.dept || user.dept

    const updatedPatient = await user.save()

    res.json({
      _id: updatedPatient._id,
      pid: updatedPatient.pid,
    })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

export {
    registerTr,
  getAllTransactions,
  deletePatientTr,
  getPatientTrById,
  updatePatientTr,
  getAllMR
}
