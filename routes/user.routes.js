const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Ruta para registrar usuario (POST /api/users)
router.post('/users', userController.createUser);

// Ruta para login de usuario (POST /api/login)
router.post('/login', userController.login);

module.exports = router;