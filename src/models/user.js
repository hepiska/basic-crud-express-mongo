/* eslint-disable func-style */
import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"
const saltRounds = Number(process.env.SALTROUND)


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: String,
  email: {
    type: String,
    required: true,
    index: true,
    trim: true,
    unique: true,
  },
  password: String,
  social_auth: {
    type: mongoose.Schema.Types.Map,
    of: String
  },
  roles: [String],
  profile_picture: String,
  guide: {
    account_no: String,
    company: String,
    balance: Number
  }
},
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  })

function saltpassword(next) {
  // eslint-disable-next-line no-invalid-this
  const pswdHashed = bcrypt.hashSync(this.password, saltRounds)

  // eslint-disable-next-line no-invalid-this
  this.password = pswdHashed

  return next()

}


userSchema.pre("save", saltpassword)

const $model = mongoose.model("User", userSchema)

$model.createIndexes()

export default $model
