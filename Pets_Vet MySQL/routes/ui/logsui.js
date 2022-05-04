import express from 'express';
import connect from '../../mySqlCon.js';

const logsuiRouter = express.Router()

logsuiRouter.get('/:id', async (req, res) => {
  try {

    const [data] = await connect.query(`
    SELECT 
    logs.id,
    logs.description,
    logs.status ,
    pets.id,
    pets.name,
    pets.dob,
    pets.client_email 
    FROM logs JOIN pets 
    ON pets.id=logs.pet_id
    WHERE pets.id=?`, [req.params.id])

    if (data.length === 0) {
      res.render('logs', {
        title: "We are sorry we do not have what to show",
        stylesSorry: "sorry.css"
      });
    } else {
      res.render('logs', {
        title: "The best first aid for your's best friend",
        styles: "main.css",
        logs: data
      });
    }

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą')
  }
})











export default logsuiRouter