const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Registrar usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      bio,
    });
    await user.save();
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    if (error.code === 11000) { // email duplicado
      return res.status(400).json({ error: 'Email ya registrado' });
    }
    res.status(400).json({ error: error.message });
  }
};