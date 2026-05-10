const mongoose = require('mongoose');

const votacionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio'],
    trim: true,
    maxlength: [100, 'El título no puede exceder los 100 caracteres']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: ['pelicula', 'cena'],
      message: 'La categoría debe ser "pelicula" o "cena"'
    }
  },
  votos: {
    type: Number,
    default: 0,
    min: [0, 'Los votos no pueden ser negativos']
  }
}, {
  timestamps: true,
  collection: 'votaciones'
});

// Índice para búsquedas por categoría
votacionSchema.index({ categoria: 1 });

// Método para incrementar votos de forma atómica
votacionSchema.methods.incrementarVoto = async function() {
  return await this.constructor.findByIdAndUpdate(
    this._id,
    { $inc: { votos: 1 } },
    { new: true }
  );
};

// Método estático para incrementar votos por ID
votacionSchema.statics.incrementarVotoPorId = async function(id) {
  const resultado = await this.findByIdAndUpdate(
    id,
    { $inc: { votos: 1 } },
    { new: true, runValidators: true }
  );
  
  if (!resultado) {
    throw new Error('Opción de votación no encontrada');
  }
  
  return resultado;
};

// Método estático para obtener opciones por categoría
votacionSchema.statics.obtenerPorCategoria = async function(categoria) {
  return await this.find({ categoria }).sort({ votos: -1, titulo: 1 });
};

const Votacion = mongoose.model('Votacion', votacionSchema);

module.exports = Votacion;
