module.exports = function (app) {
    var pregunta = require('../controllers/PreguntaController');
    var jugador = require('../controllers/JugadorController');
    var juego = require('../controllers/JuegoController');
    var respuesta = require('../controllers/RespuestaController');
    var configuracion = require('../controllers/ConfiguracionController');

    // Preguntas
    app.route('/pregunta')
        .get(pregunta.list_all_preguntas)
        .put(pregunta.update_pregunta)
        .post(pregunta.create_pregunta);
    app.route('/pregunta/:preguntaId')
        .get(pregunta.list_pregunta_by_id)
        .delete(pregunta.delete_pregunta);
    app.route('/pregunta/:preguntaId/respuestas')
        .get(respuesta.list_respuestas_by_pregunta);

    // Respuestas
    app.route('/respuesta/:idRespuesta')
        .delete(respuesta.delete_respuesta);
    app.route('/respuesta')
        .post(respuesta.create_respuesta)
        .put(respuesta.update_respuesta)
    app.route('/respuesta/correcta')
        .put(respuesta.update_correcta);

    // Juegos
    app.route('/juego')
        .get(juego.list_all_juegos)
        .post(juego.create_juego);
    app.route('/juego/:juegoId')
        .get(juego.list_juego_by_id)
        .delete(juego.delete_juego);
    app.route('/juego/:juegoId/preguntas')
        .get(juego.list_preguntas_by_juego);
    app.route('/serie')
        .post(juego.insert_pregunta);

    // Jugadores
    app.route('/jugador')
        .get(jugador.list_all_jugadores)
        .post(jugador.create_jugador)
        .put(jugador.update_puntaje);

    // Configuracion
    app.route('/configuracion')
        .get(configuracion.get_configuracion);
}