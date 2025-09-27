const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// Login usuario
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validación rápida de datos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password son requeridos' });
    }
    // Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      // Email no existe
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    // Validar contraseña
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      // Contraseña incorrecta
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    // Crear token JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret_key',
      { expiresIn: '2h' }
    );
    res.status(200).json({ token }); // Devuelve el token al cliente
  } catch (error) {
    res.status(400).json({ error: 'Error en login' });
  }
};