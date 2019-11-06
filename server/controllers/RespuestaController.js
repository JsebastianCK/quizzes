var Respuesta = require('../models/RespuestaModel');

exports.list_respuestas_by_pregunta = (req, res) => {
    Respuesta.getRespuestasByPregunta(req.params.preguntaId, (err, respuestas) => {
      if (err)
        res.send(err);
      res.send(respuestas);
    });
};

exports.update_respuesta = (req, res) => {
  Respuesta.updateRespuesta(req.body, (err, respuestas) => {
    if(err)
      res.send(err);
    res.sendStatus(200);
  })
};