const express = require('express')
const data = require('../data/data.json')
const db = require('./db/models')
const clienteRoute = require('./routes/cliente.route')
const alquilableRoute = require('./routes/alquilable.route')


const _ = require('lodash');
const app = express();
app.use(express.json())
app.use(clienteRoute)
app.use(alquilableRoute)

app.listen(3000, async ()=>{
  console.log(`La aplicacion arranco correctamente en el puerto 3000`);
  try {
    //Esto verifica si me pude conectar bien a la base de datos
     await db.sequelize.authenticate()

    // El método sync solo se usa en ambientes de desarrollo. No utilizar en produccion
    // porque borra todas las tablas y las vueve a crear
     await db.sequelize.sync({force:true});

     const cliente = await db.Cliente.create({
      nombre: 'Lionel',
      fechaNacimiento: new Date('1980-01-01')
     })

     const alquilable = await db.Alquilable.create({
      descripcion: 'Castillo Inflable',
      disponible: true,
      precio: 1200
    });

    const registros = await db.Registro.bulkCreate([
      {
        fecha: new Date('2024-01-05'),
        abono: true,
        cliente_id: cliente.id,
        rentable_id: alquilable.id
      },
      {
        fecha: new Date('2024-03-15'),
        abono: false,
        cliente_id: cliente.id,
        rentable_id: alquilable.id
      },
      {
        fecha: new Date('2024-03-17'),
        abono: false,
        cliente_id: cliente.id,
        rentable_id: alquilable.id
      }
    ]);

     await db.Alquilable.create({
      descripcion: 'Toro Mecanico',
      disponible: true,
      precio: 1230
     })

  } catch(err){
    console.log(err)
  }

        
      

})