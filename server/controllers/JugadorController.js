var Jugador = require('../models/JugadorModel');

exports.list_all_jugadores = (req, res) => {
    Jugador.getAllJugadores( (err, jugador) => {
    if (err)
        res.send(err);
    res.send(jugador);
    });
};

exports.update_puntaje = (req,res) => {
  Jugador.updatePuntaje(req.body, (err,jugador) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}

exports.create_jugador = (req,res) => {
  Jugador.createJugador(req.body, (err,jugador) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}