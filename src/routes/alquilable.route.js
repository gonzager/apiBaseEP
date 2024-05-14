const { Router } = require('express')
const db = require('../db/models')
const route = Router()

    //TODO - Mover todas las funciones a un controlador 
    route.get('/alquilable', async (req, res)=>{
        const alquilables = await db.Alquilable.findAll({});
        res.status(200).json(alquilables)
    })

    route.get('/alquilable/:id', async (req, res)=>{
        const idAlquilabe = req.params.id;
        const alquilable = await db.Alquilable.findOne(
        {
            where: {id: idAlquilabe},
            include: [
            {
                model: db.Registro,
                as: 'registros',
                include: [
                {
                    model: db.Cliente,
                    as: 'cliente'
                }
                ]
            }
            ]
        })
        res.status(200).json(alquilable)
    })

    route.post('/alquilable',async (req, res)=>{
        try {
          const alquilabe = req.body
          const newRercord = await db.Alquilable.create(alquilabe)
          res.status(201).json(newRercord)
        } catch (err) {
          res.status(500).json(err.message)
        }
    })

    route.delete('/alquilable/:id', async (req, res)=>{
        const id = req.params.id;
        const row = await db.Alquilable.destroy({where: {id}})
        if(row) {
         res.status(200).json(`El alquilable con id ${id} se borro con exito.`)
        } else {
         res.status(404).json(`El alquilable con id ${id} no existe.`)
        }
     })

    route.post('/alquilable/:id/registro', async (req, res) =>{
        const idAlquilabe = req.params.id;
        const alquilable = await db.Alquilable.findByPk(idAlquilabe)
        if(alquilable){
          const registro = req.body
          const newRercord = await db.Registro.create({ rentable_id:alquilable.id, ...registro})
          res.status(201).json(newRercord)
        } else {
          res.status(404).json({error: `El id ${idAlquilabe} no existe como alquilable.`})
        }
    })

    route.delete('/alquilable/:idAlquilable/registro/:idRegistro', async (req, res)=>{
        const idAlquilabe = req.params.idAlquilable;
        const idRegistro = req.params.idRegistro
        const row = await db.Registro.destroy({where: {id: idRegistro, rentable_id:idAlquilabe}})
        if(row) {
         res.status(200).json(`El registro con id ${idRegistro} se borro con exito del aquilable con id ${idAlquilabe}.`)
        } else {
         res.status(404).json(`El registro con id ${idRegistro} no se encontro en el aquilable con id ${idAlquilabe}.`)
        }
    })

    route.delete('/registro/:id', async (req, res)=>{
        const id = req.params.id;
        const row = await db.Registro.destroy({where: {id}})
        if(row) {
         res.status(200).json(`El registro con id ${id} se borro con exito.`)
        } else {
         res.status(404).json(`El registro con id ${id} no existe.`)
        }
    })  

    route.put('/alquilable/:id', (req, res)=>{
        const id = req.params.id;
        const idx = data.findIndex( e => e.id == id)
        if (idx >=0) {
          data[idx] = {id: Number(id), ...req.body}
          res.status(200).json(data[idx])
        } else
          res.status(404).json({error: `El id ${id} no existe.`})
    })

module.exports = route