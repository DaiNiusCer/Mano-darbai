import express from 'express';
import connect from '../../mySqlCon.js';

const medsRouter = express.Router();

//GET paduos visus vaistus iš 'medications' db;

medsRouter.get('/', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM medications`)

    res.send(data)

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą')
  }
})

//POST įrašys vieną vaistą į 'medications' db.

medsRouter.post('/', async (req, res) => {
  try {
    if (req.body.name === "") {
      res.send('Please write medicine name')
    }
    else if (req.body.description === "") {
      res.send('Please provide a discription')
    }
    else {
      const data = await connect.query(`INSERT INTO medications SET ?`, {
        name: req.body.name,
        description: req.body.description
      })
      res.redirect('/v1/meds')
    }


  } catch (err) {
    console.log("Gavai klaidą")
    res.send("You have an error")
  }
})

export default medsRouter

