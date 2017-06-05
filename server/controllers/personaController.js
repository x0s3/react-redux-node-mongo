var personaModel = require('../models/personaModel.js');
const Pers = require('./personaAcciones');
/**
 * personaController.js
 *
 * @description :: Backend para gestionar personas.
 */
module.exports = {

    /**
     * personaController.list()
     */

    list: function (req, res) {
        personaModel.find(function (err, personas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al buscar todas las personas.',
                    error: err
                });
            }
            return res.json(personas);
        });
    },

    /**
     * personaController.excel()
     */

    excel: function (req, res) {
        personaModel.find(function (err, personas) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al buscar todas las personas',
                    error: err
                });
            }
            return Pers.excel(personas) ? res.status(200).json({
                message: 'Excel creado correctamente.'
            }) : res.status(500).json({
                message: 'Excel no ha podido crearse.' 
            });
        });
    },

    /**
     * personaController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        personaModel.findOne({
            _id: id
        }, function (err, persona) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al buscar la persona.',
                    error: err
                });
            }
            if (!persona) {
                return res.status(404).json({
                    message: 'No hay ninguna persona'
                });
            }
            return res.json(persona);
        });
    },

    /**
     * personaController.create()
     */
    create: function (req, res) {
        console.log(req.body);
        var persona = new personaModel({
            nombre: req.body.nombre,
            altura: req.body.altura,
            edad: req.body.edad,
            sexo: req.body.sexo
        });

        persona.save(function (err, persona) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al crear persona',
                    error: err
                });
            }
            return res.status(201).json(persona);
        });
    },

    /**
     * personaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        personaModel.findOne({
            _id: id
        }, function (err, persona) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al buscar esa persona',
                    error: err
                });
            }
            if (!persona) {
                return res.status(404).json({
                    message: 'No hay esa persona'
                });
            }

            persona.nombre = req.body.nombre ? req.body.nombre : persona.nombre;
            persona.altura = req.body.altura ? req.body.altura : persona.altura;
            persona.edad = req.body.edad ? req.body.edad : persona.edad;
            persona.sexo = req.body.sexo ? req.body.sexo : persona.sexo;

            persona.save(function (err, persona) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error al actualizar la persona.',
                        error: err
                    });
                }
                return res.status(200).json(persona);
            });
        });
    },

    /**
     * personaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        personaModel.findByIdAndRemove(id, function (err, persona) {
            if (err) {
                return res.status(500).json({
                    message: 'Error al eliminar esa persona.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};