module.exports = function (app) {
    var pregunta = require('../controllers/PreguntaController');
    var jugador = require('../controllers/JugadorController');
    var juego = require('../controllers/JuegoController');
    var respuesta = require('../controllers/RespuestaController');

    // Preguntas
    app.route('/pregunta')
        .get(pregunta.list_all_preguntas);
    app.route('/pregunta/:preguntaId')
        .get(pregunta.list_pregunta_by_id);
    app.route('/pregunta/:preguntaId/respuestas')
        .get(respuesta.list_respuestas_by_pregunta);

    // Juegos
    app.route('/juego')
        .get(juego.list_all_juegos)
        .post(juego.create_juego);
    app.route('/juego/:juegoId')
        .get(juego.list_juego_by_id);
    app.route('/juego/:juegoId/preguntas')
        .get(juego.list_preguntas_by_juego);
    
    // Jugadores
    app.route('/jugador')
        .get(jugador.list_all_jugadores)
        .post(jugador.create_jugador);
}