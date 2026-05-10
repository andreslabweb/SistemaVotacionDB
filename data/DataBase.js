const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    // En Mongo, si la base de datos 'votacion_db' no existe, se crea sola
    await mongoose.connect('mongodb://127.0.0.1:27017/votacion_db');
    console.log('=> Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
    process.exit(1);
  }
};

module.exports = conectarDB;