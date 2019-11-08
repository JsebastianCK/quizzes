var sql = require('../db');

//Pregunta object constructor
var Configuracion = function(configuracion){
    this.titulo             = configuracion.titulo;
    this.mensajeBienvenida  = configuracion.mensajeBienvenida;
    this.imagenPresentacion = configuracion.imagenPresentacion;
    this.fondoJuego         = configuracion.fondoJuego;
};
Configuracion.getConfiguracion = (result) => {
    sql.query(`
            SELECT * FROM configuracion LIMIT 1
        ` , (err,res) => {
        if(err)
            result(err,null);
        else
            result(null,res);
    })
}

module.exports = Configuracion;