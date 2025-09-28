const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../config/multer.config');
const auth  = require  ('../middleware/secure.middleware')




// Ruta para registrar usuario (POST /api/users)
router.post('/users', upload.single('avatar'), userController.createUser);

// Ruta para login de usuario (POST /api/login)
router.post('/login', userController.login);

// Ruta para activar usuario
router.get('/users/activate/:id',auth , userController.activateUser);

// Obtener usuario y mostar URL del avatar
router.get('/users/:id', userController.getUser);

module.exports = router;

