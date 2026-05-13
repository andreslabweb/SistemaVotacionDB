const opcionesController = {};

opcionesController.mostrarOpciones = (req, res) => {
    res.send('Página de inicio: Aquí se verán las opciones para votar');
};

opcionesController.votar = (req, res) => {
    res.send('Voto procesado (Simulación)');
};

opcionesController.mostrarResultados = (req, res) => {
    res.send('Página de resultados: Aquí se verán los votos totales');
};

module.exports = opcionesController;