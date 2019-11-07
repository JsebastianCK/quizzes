var Respuesta = require('../models/RespuestaModel');

exports.list_respuestas_by_pregunta = (req, res) => {
    Respuesta.getRespuestasByPregunta(req.params.preguntaId, (err, respuestas) => {
      if (err)
        res.send(err);
      res.send(respuestas);
    });
};

exports.update_correcta = (req, res) => {
  Respuesta.updateCorrecta(req.body, (err, respuestas) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
};

exports.update_respuesta = (req, res) => {
  Respuesta.updateRespuesta(req.body, (err, respuestas) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
};

exports.create_respuesta = (req, res) => {
  Respuesta.insertRespuesta(req.body, (err, respuesta) => {
    if(err)
      res.send(err);
    res.send(respuesta);
  })
};

exports.delete_respuesta = (req, res) => {
  Respuesta.deleteRespuesta(req.params.idRespuesta, (err, respuestas) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
};