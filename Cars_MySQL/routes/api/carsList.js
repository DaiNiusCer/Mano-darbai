//Importuojami moduliai
import express from 'express';
import connect from '../../mySqlCon.js';
//Importuojami moduliai

//Express Router
const carsRouter = express.Router()

//Pasiimti informaciją ir ją atvaizduoti GET
carsRouter.get('/cars', async (req, res) => {
  try {
    const [data] = await connect.query("SELECT * FROM cars")
    res.send(data)

  } catch (err) {
    console.log("Error")
    res.send('Gavai klaidą')
  }
})

//Atvaizduoti įvedus id
carsRouter.get('/cars/:id', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM cars WHERE ID= ?`, [req.params.id])
    if (data.length === 0) {
      res.send("Sorry bičas, blogas ID")
    } else {
      res.send(data)
    }

  } catch (err) {
    console.log("Error")
    res.send('Gavai klaidą')
  }
})
//Atvaizduoti įvedus id
//Trinti per handle bars
carsRouter.get('/delete/:id', async (req, res) => {
  try {
    const [data] = await connect.query(`DELETE FROM cars WHERE ID =?`, [req.params.id])
    res.redirect('/cars')

  } catch (err) {
    console.log("Gavai klaidą")
    res.send(err)
  }
})



//Trinti per handle bars






//Pasiimti informaciją ir ją atvaizduoti GET

//Pridėti naują informaciją POST

carsRouter.post("/", async (req, res) => {
  try {
    if (req.body.masinosMarke === "") {
      res.send('Please enter car brand push back')
    }
    else if (req.body.pavNuoroda === "") {
      res.send('Please provide image URL push back')
    }
    else if (req.body.kaina === "" || req.body.kaina <= 1) {
      res.send('Please enter price push back')
    } else if (req.body.masinosNumeriai === "") {
      res.send('Please provide numberplates push back')
    } else {
      const data = await connect.query(`INSERT INTO cars SET ?`, {
        title: req.body.masinosMarke,
        image: req.body.pavNuoroda,
        price: req.body.kaina,
        numberplates: req.body.masinosNumeriai
      })

      res.redirect('/addcar')

    }


  } catch (err) {
    console.log("Gavai klaidą")
    res.send(err)
  }
})

//Pridėti naują informaciją POST

//Ištrinti įrašą DELETE
carsRouter.delete("/cars/:id", async (req, res) => {
  try {
    const data = await connect.query(`DELETE FROM cars WHERE ID =?`, [req.params.id])
    res.send(data)


  } catch (err) {
    console.log("Gavai klaidą")
    res.send(err)
  }
})

//Ištrinti įrašą DELETE



//Eksportuojam kokiu norime pavadinimu į app.js
export default carsRouter
