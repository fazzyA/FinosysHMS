import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const patientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    MRno: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      default: '123456'
    },
    age: { type: Number },
    notes: { type: String },
    dept: { type: String },
    status:{ type: String},
    condition:{ type: String}
  },
  {
    timestamps: true,
  }
)

patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

patientSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const Patient = mongoose.model('Patient', patientSchema)

export default Patient
