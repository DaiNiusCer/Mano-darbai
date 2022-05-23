import express from 'express'
import connect from '../../mySQLcon.js'
import auth from '../../auth.js'

const router = express.Router();

//Puslapio atvaizdavimas pradžia bei įdėtas middle ware kur tikrina ar vartotojas yra prisijungęs
router.get('/', auth, async (req, res) => {
  try {
    res.render('addbar', { title: "Add bar to Your's personal list!" })

  } catch (err) {
    console.log(`Klaida addbar puslapyje: ${err}`)
    res.send({ err: `Gavai klaidą addbar dalyje: ${err}` })
  }
})
//Puslapio atvaizdavimas pabaiga

//Baro pridėjimas pradžia
router.post("/", auth, async (req, res) => {
  try {
    let photo = req.body.photo
    let title = req.body.title;
    let adress = req.body.adress;
    let rate = req.body.rate;
    let priceRate = req.body.price_rate;

    if (photo === "") {
      res.send('Please write bar photo URL')
    }
    else if (title === "") {
      res.send('Please provide bar name')
    }
    else if (adress === "") {
      res.send('Please write bar adress')
    } else {
      const data = await connect.query(`INSERT INTO bars.bars SET ?`, {
        photo: photo,
        title: title,
        adress: adress,
        rate: rate,
        price_rate: priceRate
      })

      res.redirect('/')

    }


  } catch (err) {
    console.log(`Klaida addbar puslapyje: ${err}`)
    res.send({ err: `Gavai klaidą addbar dalyje: ${err}` })
  }
})
//Baro pridėjimas pradžia

//Baro ištrynimas pradžia
//Ištrynimas vyksta mygtuko nuspadimo vietoje kur iškviečiama funkcija su fetch
//Mygtukas yra atvaizduojamas index dalyje ir taip fetch nurodomas pilnas adresas addbar/bars/id
router.delete("/bars/:id", async (req, res) => {
  try {
    const data = await connect.query(`DELETE FROM bars.bars WHERE ID =?`, [req.params.id])
    res.send(data)


  } catch (err) {
    console.log(`Klaida addbar puslapyje: ${err}`)
    res.send({ err: `Gavai klaidą addbar dalyje: ${err}` })
  }
})
//Baro ištrynimas pabaiga


export default router