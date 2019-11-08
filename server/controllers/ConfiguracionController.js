var Configuracion = require('../models/ConfiguracionModel');

exports.get_configuracion = (req, res) => {
    Configuracion.getConfiguracion( (err, configuracion) => {
    if (err)
        res.send(err);
    res.send(configuracion);
    });
};