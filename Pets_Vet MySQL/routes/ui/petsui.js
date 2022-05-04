import express from 'express';
import connect from '../../mySqlCon.js';

const petsuiRouter = express.Router()
// Gyvunu atvaizdavimas UI
petsuiRouter.get('/', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM pets WHERE archived=0`)

    res.render('pets', {
      title: " The Best First Aid For Your's Best Friend",
      pets: data,
      styles: "main.css"
    });

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą petsuiRoiter')
  }
})



export default petsuiRouter