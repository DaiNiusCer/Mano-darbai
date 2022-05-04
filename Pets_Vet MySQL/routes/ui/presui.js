import express from 'express';
import connect from '../../mySqlCon.js';

const presuiRouter = express.Router()

presuiRouter.get('/', async (req, res) => {
  try {
    const [data] = await connect.query(`
    SELECT 
    prescriptions.id,
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
    pets.archived=0`);

    res.render('allpres', {
      title: " See all prescriptions",
      allpres: data,
      styles: "main.css"
    });

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą presuiRouter')
  }
})





export default presuiRouter