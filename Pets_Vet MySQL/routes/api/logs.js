import express from 'express';
import connect from '../../mySqlCon.js';

const logsRouter = express.Router();

logsRouter.get('/', async (req, res) => {
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
    WHERE pets.archived=0`)

    res.send(data)

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą')
  }
})

//POST įrašys naują įrašą į 'logs' db.
logsRouter.post('/', async (req, res) => {
  try {
    if (req.body.pet_id === "") {
      res.send('Please provide pet id')
    }
    else if (req.body.description === "") {
      res.send('Please provide a discription')
    } else if (req.body.status === "") {
      res.send('Please provide pet status ill/healthy')
    }
    else {
      const data = await connect.query(`INSERT INTO logs SET ?`, {
        pet_id: req.body.pet_id,
        description: req.body.description,
        status: req.body.status
      })
      res.redirect('/v1/logs')
    }


  } catch (err) {
    console.log("Gavai klaidą")
    res.send("You have an error")
  }
})


export default logsRouter


