import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const transSchema = mongoose.Schema(
  {
    pid: {
      type: String,
      required: true,
    },
    MRno: {
      type: String,
    },
status: {
      type: String,
    },
    service:{      type: String,
    },
    condition: {
      type: String,
    },
    dept: {
      type: String,
      required: true,
    },
    drReffered: { type: String },
    notes: { type: String },
    tests: { type: String },
  },
  {
    timestamps: true,
  }
)


const PatientTr = mongoose.model('PatientTr', transSchema)

export default PatientTr
