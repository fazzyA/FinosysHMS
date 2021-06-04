import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Patient from '../models/patientModel.js'

// @desc    Register a new patient
// @route   POST /api/patient
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, MRno, age, dept } = req.body

  const PatientExists = await Patient.findOne({ email })

  if (PatientExists) {
    res.status(400)
    throw new Error('Patient already exists')
  } 

  const patient = await Patient.create({
    name, email, MRno, age, dept
  })

  if (patient) {
    res.status(201).json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      MRno: patient.MRno,
      dept: patient.dept,
    })
  } else {
    res.status(400)
    throw new Error('Invalid patient data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getPatientProfile = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.user._id)

  if (patient) {
    res.json({
      _id: patient._id,
      name: patient.name,
      email: patient.email,
      age: patient.age,
      MRno: patient.MRno,
      dept: patient.dept,
    })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})


// @desc    Get all patient MR#
// @route   GET /api/patient/getAllMR
// @access  Private/Admin
const getAllMR = asyncHandler(async (req, res) => {
  const users = await Patient.find({}).select('MRno')
  res.json(users)
})


// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getPatients = asyncHandler(async (req, res) => {
  const users = await Patient.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deletePatient = asyncHandler(async (req, res) => {
  const user = await Patient.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'Patient removed' })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getPatientById = asyncHandler(async (req, res) => {
  const user = await Patient.findById(req.params.id).select('-password')

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
const updatePatient = asyncHandler(async (req, res) => {
  const user = await Patient.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.age = req.body.age || user.age
    user.MRno = req.body.MRno || user.MRno
    user.dept = req.body.dept || user.dept
    user.status = req.body.status || user.status

    const updatedPatient = await user.save()

    res.json({
      _id: updatedPatient._id,
      name: updatedPatient.name,
      email: updatedPatient.email,
    })
  } else {
    res.status(404)
    throw new Error('Patient not found')
  }
})

export {
  register,
  getPatientProfile,
  getPatients,
  deletePatient,
  getPatientById,
  updatePatient,
  getAllMR
}
