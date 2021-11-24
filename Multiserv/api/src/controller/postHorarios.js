const { Horarios, Servicios } = require("../db.js");

const postHorarios = async (req, res) => {
    const { idService } = req.params; 
    const { direccion, aDomicilio, dias, horarios } = req.body;
    try {
        const newHorario = { direccion, aDomicilio, dias, horarios }
        const horario = await Horarios.create(newHorario);
        const servicio = await Servicios.findByPk(idService)
        await servicio.addHorarios(horario)
        console.log(horario)
         res.send(`Horario agregado correctamente al servicio ${servicio.title}, con id: ${idService}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = postHorarios