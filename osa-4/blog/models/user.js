const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },

  name: {
    type: String,
    required: true
  },

  passwordHash: {
    type: String,
    required: true
  },

  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    }
  ]
})

userSchema.set('toJSON', {
  transform: (doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
    delete retObj.passwordHash // Don't expose password hash on JSON query
  }
})

userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('User', userSchema)