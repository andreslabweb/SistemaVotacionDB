const express = require('express');
const router = express.Router();
const Votacion = require('../models/Votacion');

// Rutas de ejemplo para la API
router.get('/', (req, res) => {
    res.json({ message: 'API de Votaciones funcionando' });
});

// Obtener todas las votaciones (opcionalmente filtrar por categoría)
router.get('/votaciones', async (req, res) => {
    try {
        const { categoria } = req.query;
        let votaciones;
        
        if (categoria) {
            votaciones = await Votacion.obtenerPorCategoria(categoria);
        } else {
            votaciones = await Votacion.find().sort({ votos: -1, titulo: 1 });
        }
        
        res.json({
            message: 'Lista de votaciones',
            data: votaciones,
            count: votaciones.length
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener votaciones',
            error: error.message
        });
    }
});

// Crear una nueva opción de votación
router.post('/votaciones', async (req, res) => {
    try {
        const { titulo, categoria } = req.body;
        
        // Verificar si ya existe una opción con el mismo título y categoría
        const existente = await Votacion.findOne({ titulo, categoria });
        if (existente) {
            return res.status(400).json({
                message: 'Ya existe una opción con este título en esta categoría'
            });
        }
        
        const nuevaVotacion = new Votacion({ titulo, categoria });
        await nuevaVotacion.save();
        
        res.status(201).json({
            message: 'Votación creada exitosamente',
            data: nuevaVotacion
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error al crear votación',
            error: error.message
        });
    }
});

// Votar por una opción (incrementar votos de forma atómica)
router.put('/votaciones/:id/votar', async (req, res) => {
    try {
        const { id } = req.params;
        
        const votacionActualizada = await Votacion.incrementarVotoPorId(id);
        
        res.json({
            message: 'Voto registrado exitosamente',
            data: votacionActualizada
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
            error: 'Opción de votación no encontrada'
        });
    }
});

// Obtener una opción específica
router.get('/votaciones/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const votacion = await Votacion.findById(id);
        
        if (!votacion) {
            return res.status(404).json({
                message: 'Opción de votación no encontrada'
            });
        }
        
        res.json({
            message: 'Opción encontrada',
            data: votacion
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al obtener la opción',
            error: error.message
        });
    }
});

// Eliminar una opción
router.delete('/votaciones/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const votacionEliminada = await Votacion.findByIdAndDelete(id);
        
        if (!votacionEliminada) {
            return res.status(404).json({
                message: 'Opción de votación no encontrada'
            });
        }
        
        res.json({
            message: 'Opción eliminada exitosamente',
            data: votacionEliminada
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar la opción',
            error: error.message
        });
    }
});

module.exports = router;
