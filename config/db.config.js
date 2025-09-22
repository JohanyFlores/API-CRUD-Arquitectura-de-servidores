const mongoose = require('mongoose');
const {MongoMemoryServer} = require ('mongodb-memory-server');

const connectDB = async () => {
    const mongoServer = await MongoMemoryServer.create ();
    const mongoUri = mongoServer.getUri();


    try {
        await mongoose.connect (mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log ('MongoDB en memoria conectado exitosamente');

        }catch (error) {
            console.error ('Error al conectar a MongoDB en memoria', error);
            process.exit(1);
        }
    };

    module.exports = connectDB;