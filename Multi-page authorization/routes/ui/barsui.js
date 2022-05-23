import express from 'express';
import isAuth from '../../isAuth.js';
import connect from '../../mySQLcon.js';

const router = express.Router();

/*
Pagrindinis puslapio atvaizdavimas, pirmiausiai apsirašo paprastas get,
po to galima pridėti filtravimą ir rikiavimą, ir jeigu norma flash message įterpti
*/
router.get('/:bars?', async (req, res) => {
  try {

    //Kintamasis isAuth skirta true arba false kuomet yra patikrina ar yra cookie ir grazina tik true arba false
    const auth = await isAuth(req)
    //Kintamasis isAuth skirta true arba false kuomet yra patikrina ar yra cookie ir grazina tik true arba false

    //Filtravimas pradžia
    let baroPavadinimas = req.query.title;
    let vertinimasNuo = req.query.vertinimasNuo;
    let vertinimasIki = req.query.vertinimasIki;

    if (baroPavadinimas === undefined || baroPavadinimas === "") {
      baroPavadinimas = '%'
    } else {
      baroPavadinimas = req.query.title
    }

    if (vertinimasNuo === undefined || vertinimasNuo === "") {
      vertinimasNuo = '1'
    } else {
      vertinimasNuo = req.query.vertinimasNuo
    }

    if (vertinimasIki === undefined || vertinimasIki === "") {
      vertinimasIki = '5'
    } else {
      vertinimasIki = req.query.vertinimasIki
    }
    //Filtravimas pabaiga

    //Rikiavimas pradžia
    let rikiuotiPagal = req.query.rikiuotiPagal;
    let kokiaTvarkaRikiuoti = req.query.rikiavimas;



    if (rikiuotiPagal === undefined || rikiuotiPagal === "null") {
      rikiuotiPagal = "id"
    } else {
      rikiuotiPagal = req.query.rikiuotiPagal
    }

    if (kokiaTvarkaRikiuoti === "mazejanti") {
      kokiaTvarkaRikiuoti = "DESC"
    } else {
      kokiaTvarkaRikiuoti = "ASC"
    }

    //Rikiavimas pabaiga

    const [data] = await connect.query(`SELECT bars.id, bars.photo,bars.title,bars.rate,bars.price_rate,bars.adress FROM bars WHERE title LIKE '${baroPavadinimas}' AND price_rate BETWEEN ${vertinimasNuo} AND ${vertinimasIki} ORDER BY ${rikiuotiPagal} ${kokiaTvarkaRikiuoti} `);
    res.render('index', { bars: data, title: "See best bars in the World!", auth: auth })
  }
  catch (err) {
    console.log(`${err}`)
    res.send({ err: `${err}` })
  }
})

export default router