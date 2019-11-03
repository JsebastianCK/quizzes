var Pregunta = require('../models/PreguntaModel');

exports.list_all_preguntas = function(req, res) {
  Pregunta.getAllPreguntas(function(err, pregunta) {
    if (err)
      res.send(err);
    res.send(pregunta);
  });
};

exports.list_pregunta_by_id = function(req, res) {
    Pregunta.getPreguntaById(req.params.preguntaId, function(err, pregunta) {
      if (err)
        res.send(err);
      res.send(pregunta[0]);
    });
  };

exports.update_pregunta = (req,res) => {
  Pregunta.updatePregunta(req.body, (err,pregunta) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}

exports.create_pregunta = (req,res) => {
  Pregunta.createPregunta(req.body, (err,pregunta) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
}