//Moduliai
import 'dotenv/config';
import express from 'express';
import carsRouter from './routes/api/carsList.js';
import { engine } from 'express-handlebars';
import connect from './mySqlCon.js';
//Moduliai

//Serverio pakūrimas
const app = express()
const PORT = process.env.PORT0 || 6666
const puslapiavimas = {
  limit: 10,
  skip: 0
};
//Serverio pakūrimas
//CSS prijungimas prie visų handle bars
app.use(express.static('public'))

//Paveiksliuku prijungimas
app.use(express.static('public/img'))


//Handle-bars nustatymai
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')
//Handle-bars nustatymai

//Papildomi nustatymai
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
// Papildomi nustatymai






//Handlebars prijungimas/isvedimas
app.get('/:cars?', async (req, res) => {

  //Rikiavimas

  let kokiaTvarkaRikiuot = req.query.rikiavimas;
  let rikiuotPagal = req.query.rikiuotPagal;

  if (kokiaTvarkaRikiuot === undefined || kokiaTvarkaRikiuot === "didejanti") {
    kokiaTvarkaRikiuot = "ASC"
  } else {
    kokiaTvarkaRikiuot = "DESC"
  }

  if (rikiuotPagal === undefined || rikiuotPagal === "null") {
    rikiuotPagal = "ID"
  } else {
    rikiuotPagal = req.query.rikiuotPagal
  }

  //Rikiavimas

  //Filtravimas

  let masinosMarke = req.query.masinosMarke;
  let kainaNuo = req.query.kainaNuo;
  let kainaIki = req.query.kainaIki;




  if (masinosMarke === undefined || masinosMarke === "") {
    masinosMarke = '%'
  } else {
    masinosMarke = req.query.masinosMarke
  }
  if (kainaNuo === undefined || kainaNuo === "") {
    kainaNuo = '0'
  } else {
    kainaNuo = req.query.kainaNuo
  }

  if (req.query.kainaIki) {
    kainaIki = req.query.kainaIki;
  } else {
    kainaIki = '9999999999';
  }



  //Filtravimas

  //Puslapiavimas
  if (req.query.limit && req.query.limit !== puslapiavimas.limit) {
    puslapiavimas.limit = req.query.limit;
    puslapiavimas.skip = 0;
  }


  //Puslapiavimas


  const [data] = await connect.query(`SELECT * FROM cars WHERE title  LIKE '${masinosMarke}' AND  price BETWEEN '${kainaNuo}' AND '${kainaIki}' ORDER BY ${rikiuotPagal} ${kokiaTvarkaRikiuot} LIMIT ${puslapiavimas.limit} OFFSET ${puslapiavimas.skip}`)

  //Skip

  if (req.query.skip) {
    if (puslapiavimas.skip === 0 && Number(req.query.skip) < 0) {
    } else if (puslapiavimas.skip + Number(req.query.skip) >= data.length) {
    } else {
      puslapiavimas.skip += Number(req.query.skip);
    }
  }
  //Skip


  puslapiavimas.puslapiuKiekis = Math.ceil(data.length / puslapiavimas.limit);
  puslapiavimas.esamasPuslapis = puslapiavimas.skip / puslapiavimas.limit + 1;
  res.render('automobiliai', {
    title: "Our's cars",
    automobiliai: data,
    puslapiavimas: puslapiavimas

  });
});


app.get('/addcar', async (req, res) => {

  res.render('addcar', {
    title: "Add a new car"

  });
});


//Handlebars prijungimas/isvedimas




//Pradedamas naudoti routas
app.use('/api/carsList', carsRouter)
//Pradedamas naudoti routas

//Serverio pakūrimas
app.listen(PORT, console.log(`Serveris veikia ant ${PORT} porto`))
//Serverio pakūrimas


/*
const [data] = await connect.query(`SELECT * FROM cars WHERE title  LIKE '${masinosMarke}' AND  price BETWEEN 1000 AND 30000 ORDER BY ${rikiuotPagal} ${kokiaTvarkaRikiuot}`)
*/