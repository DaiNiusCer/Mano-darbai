import express from 'express';
import connect from '../../mySqlCon.js';

const presRouter = express.Router();

//GET paims vieno augintinio visus įrašus iš 'prescriptions' db ir apjungs juos su pets ir med lentelėmis.
presRouter.get('/', async (req, res) => {
  try {
    const [data] = await connect.query(`
    SELECT 
    prescriptions.medication_id,
    prescriptions.pet_id,
    prescriptions.comment,
    prescriptions.timestamp
   
    FROM prescriptions 
    JOIN medications 
    ON 
    medications.id=prescriptions.medication_id
    JOIN pets
    ON 
    pets.id=prescriptions.pet_id
    WHERE 
    pets.archived=0`)

    res.send(data)

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą')
  }
});

//POST įrašys naują įrašą į 'prescriptions' db.
presRouter.post('/', async (req, res) => {
  try {
    const timeStamp = new Date().toLocaleString('en')
    if (req.body.medication_id === "") {
      res.send('Please provide medication id')
    }
    else if (req.body.pet_id === "") {
      res.send('Please provide a pet')
    } else if (req.body.comment === "") {
      res.send(req.body.comment)
    }
    else {

      const data = await connect.query(`INSERT INTO prescriptions SET ?`, {
        medication_id: req.body.medication_id,
        pet_id: req.body.pet_id,
        comment: req.body.comment,

      })
      res.redirect('/v1/prescriptions')
    }


  } catch (err) {
    console.log("Gavai klaidą")
    res.send("You have an error")
  }
})



export default presRouter

/*
SELECT 
    prescriptions.medication_id,
    prescriptions.pet_id,
    prescriptions.comment,
    prescriptions.timestamp,
   
    FROM prescriptions JOIN medications 
    ON prescriptions.medication_id=medications.id
    FROM prescriptions JOIN pets
    ON prescriptions.medication_id=pets.id
    WHERE pets.archived=0

    SELECT * FROM table1
LEFT JOIN table2
   ON table2.id = table1.id
LEFT JOIN table3
   ON table3.id = table2.id
WHERE month = 'numberHere'
AND(table2.email IS NOT NULL OR table3.email IS NOT NULL)
ORDER BY submitdate DESC
*/
