import express from 'express';
import connect from '../../mySqlCon.js';
//Moduliai

const petsRouter = express.Router()

//Pasiimti informacija bei  ja atvaizduoti, gyvūnai, kurie nėra archyvuoti
petsRouter.get('/', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM pets WHERE archived=0`)

    res.send(data)

  } catch (err) {
    console.log("Gavai klaida")
    res.send('Gavai klaidą')
  }
})

//Pridėti naują pets POST
petsRouter.post('/', async (req, res) => {
  try {
    if (req.body.name === "") {
      res.send('Please write pet name')
    }
    else if (req.body.dob === "") {
      res.send('Please write pet date of birth')
    }
    else if (req.body.client_email === "") {
      res.send('Please provide email')
    }
    else {
      const data = await connect.query(`INSERT INTO pets SET ?`, {
        name: req.body.name,
        dob: req.body.dob,
        client_email: req.body.client_email
      })
      res.redirect('/addpet')
    }


  } catch (err) {
    console.log("Gavai klaidą")
    res.send("You have an error")
  }
})

//DELETE pakoreguoja augintinį pagal ID, kuriam 'archived' tampa '1' (t.y. true).

petsRouter.delete('/:id', async (req, res) => {
  try {
    await connect.query(`UPDATE pets SET archived=1 WHERE id=?`, [req.params.id])


  } catch (err) {
    console.log("Gavai klaidą")
    res.send(err)
  }
})


export default petsRouter


/*
petsRouter.get('/:id', async (req, res) => {
  try {
    const [data] = await connect.query(`UPDATE pets SET archived=1 WHERE id=?`, [req.params.id])
    res.redirect('/pets')

  } catch (err) {
    console.log("Gavai klaidą")
    res.send(err)
  }
})


      <a href="/v1/pets/{{this.id}}"> <button class="trinti" >Delete</button></a>




*/