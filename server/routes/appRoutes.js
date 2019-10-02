module.exports = function (app) {
    var preguntas = require('../controllers/PreguntaController');

    // Preguntas
    app.route('/preguntas')
        .get(preguntas.list_all_preguntas);
    app.route('/preguntas/:preguntaId')
        .get(preguntas.list_pregunta_by_id)
}