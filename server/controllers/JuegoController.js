var Juego = require('../models/JuegoModel');

exports.list_all_juegos = (req, res) => {
    Juego.getAllJuegos( (err, juego) => {
    if (err)
        res.send(err);
    res.send(juego);
    });
};

exports.list_juego_by_id = (req, res) => {
    Juego.getJuegoById(req.params.juegoId, (err, juego) => {
      if (err)
        res.send(err);
      res.send(juego[0]);
    });
};

exports.list_preguntas_by_juego = (req, res) => {
    Juego.getAllPreguntas(req.params.juegoId, (err, juego) => {
      if (err)
        res.send(err);
      res.send(juego);
    });
};

exports.create_juego = (req,res) => {
  Juego.createJuego(req.body, (err,juego) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}

exports.delete_juego = (req,res) => {
  Juego.deleteJuego(req.params.juegoId, (err,juego) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}

exports.insert_pregunta = (req,res) => {
  Juego.insertPregunta(req.body, (err,juego) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}