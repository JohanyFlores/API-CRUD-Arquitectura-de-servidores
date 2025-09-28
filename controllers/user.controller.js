const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, bio } = req.body;
    const avatar = req.file ? `/avatars/${req.file.filename}` : null;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      bio,
      avatar,
    });
    await user.save();

    // envio de url para realizar la activación

    const activationUrl = `${req.protocol}://${req.get('host')}/api/users/activate/${user._id}`; 


    res.status(201).json({ message: 'Usuario creado correctamente. Activa tu cuenta con el enlace.',activationUrl});
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

    //Se valida ahora si el usuario esta activo 
    if (!user || !user.active) {
      // Email no existe
      return res.status(401).json({ error: 'Credenciales incorrectas o usuario no activado' });
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


// Función para activar usuarios
exports.activateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ message: 'Cuenta activada. Ya puedes iniciar sesión.' });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  if (user.avatar) user.avatar = `${req.protocol}://${req.get('host')}${user.avatar}`;
  res.json(user);
};