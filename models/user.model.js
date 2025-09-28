const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Formato de email inválido',
    },
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  bio: String,
  active: {
    type: Boolean,
    default: false,
  },
  avatar: String, 

}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;