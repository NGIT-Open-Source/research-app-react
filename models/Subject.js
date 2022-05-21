const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
  Hospital: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    maxlength: [40, 'HOSpitAL cannot be more than 40 characters'],
  },
  Radiologist: {
    type: String,
    required: [true, 'Please add a title'],
  },
  RadioEmail: {
    type: String,
    required: [true, 'Please add a title'],
  },
  password: {
    type: String,
    required: [true, 'Please add a title'],
  },
  Location: {
    type: String,
    required: [true, 'Please add a title'],
  },
})

module.exports =
  mongoose.models.Subject || mongoose.model('Subject', SubjectSchema)
