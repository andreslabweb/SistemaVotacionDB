require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/votacion_db';

// Conexión a MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('=> Conexión exitosa a MongoDB'))
  .catch(err => {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Motor de Vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Rutas
app.get('/', (req, res) => {
    res.send('Servidor de Votaciones funcionando correctamente');
});

// API routes
app.use('/', require('./routes/api'));

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Accede a http://localhost:${PORT}`);
});

module.exports = app;