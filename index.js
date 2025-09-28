const express = require('express');
const connectDB = require('./config/db.config');
const postRoutes = require('./routes/post.routes'); // Rutas post
const userRoutes = require('./routes/user.routes'); // Rutas Usuarios

const app = express();
const PORT = 8000;

app.use(express.json());

connectDB();

app.use('/api/posts', postRoutes);
app.use('/api', userRoutes); 

const path = require('path');

app.use('/avatars', express.static(path.join(__dirname, 'uploads/avatars')));  // Crea la ruta donde se guarda la imagen


app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
