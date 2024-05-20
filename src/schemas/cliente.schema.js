const Joi = require('joi')
const validateDate = require('../ultis/date.validator')

const clienteSchema = Joi.object().keys({
    nombre: Joi.string().required().min(3).max(20).messages({
        "string.min": `nombre debe tener al menos {#limit} caracters.`,
        "string.max": `nombre debe tener como máximo {#limit} caracters.`,
        "string.empty": "nombre no puede ser vacio",
        "any.required": "nombre es requerido"      
    }),
    fechaNacimiento: Joi.string().custom(validateDate).required().messages({
        "any.custom": "El formato de la fecha debe ser YYYY-MM-DD",
        "any.required": "El campo fecha es obligatorio"
    })
   
})

module.exports = clienteSchema