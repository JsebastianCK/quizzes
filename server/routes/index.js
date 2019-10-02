module.exports = function (app) {
    var preguntas = require('../controllers/Preguntas');

    // Preguntas
    app.route('/preguntas')
        .get(preguntas.getAllPreguntas);
}