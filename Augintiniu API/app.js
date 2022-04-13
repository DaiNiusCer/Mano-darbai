import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routerAug from './routes/api/augintiniai.js';
import routerSeim from './routes/api/seimininkai.js';
import { engine } from 'express-handlebars';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: `localhost:${PORT}`,
  optionsSuccessStatus: 200
};
const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});
const augintiniuDuomenys = client.db('augintiniu_api').collection('augintiniai');
client.connect();
const seimininkuDuomenys = client.db('augintiniu_api').collection('seimininkai');

//CSS prijungimas prie visų handle bars

app.use(express.static('public'))

//Paveiksliuku nusirodymas
app.use(express.static('public/img'))


//HANDLE BARS SET UP

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));


//Prisijungimas prie augintiniu  pradžia sortinimas

app.get('/augintiniai', async (req, res) => {
  ///Filtravimo kintamieji
  let gyvunoTipas = req.query.tipas;
  let metaiNuo = req.query.metaiNuo;
  let metaiIki = req.query.metaiIki;
  let arSkiepytas = req.query.arSkiepytas;
  //Filtravimo kintamieji
  if (gyvunoTipas === undefined || gyvunoTipas === "null") {
    gyvunoTipas = ["katė", "šuo", "šinšilas", "karvė", "žiurkėnas", "avis", "arklys", "kiaulė", "jautis", "katinas"]
  } else {
    gyvunoTipas = [req.query.tipas]
  }



  if (metaiNuo === "undefined" || metaiNuo == null) {
    metaiNuo = 0
  } else {
    metaiNuo = Number(req.query.metaiNuo)
  }



  if (metaiIki === "undefined" || metaiIki == null || metaiIki === "") {
    metaiIki = 30
  } else {
    metaiIki = Number(req.query.metaiIki)
  }

  if (arSkiepytas === "on") {
    arSkiepytas = [true]
  } else {
    arSkiepytas = [true, false]
  }

  //Filtravimo kintamieji


  //Sortinimo kintamieji
  let didejaMazeja = req.query.didejaMazeja;
  let rikiuotiPagal = req.query.rikiavimoTvarka;
  //Sortinimo kintamieji

  //Sortinimo sąlygos

  if (didejaMazeja === undefined || didejaMazeja === "dideja") {
    didejaMazeja = 1
  } else {
    didejaMazeja = -1
  }

  rikiuotiPagal === undefined ? rikiuotiPagal = "_id" : "null";
  //Sortinimo sąlygos


  res.render('augintiniai', {
    title: "Augintiniai",
    pets: await augintiniuDuomenys.find({ $and: [{ tipas: { $in: gyvunoTipas } }, { amzius: { $gte: metaiNuo, $lte: metaiIki } }, { skiepytas: { $in: arSkiepytas } }] }).sort({ [rikiuotiPagal]: [didejaMazeja] }).toArray()
  });


  //redirect("/augintiniai")


});

app.use('/api/augintiniai', routerAug);

//Prisijungimas prie augintiniu  pabaiga


//Prisijungimas prie seimininku pradzia
app.get('/seimininkai', async (req, res) => {
  //Filtravimas pradžia
  let vardas = req.query.seimininkoVardas;
  let pavarde = req.query.seimininkoPavarde;
  let lytis = req.query.lytis;
  let metaiNuoSeim = req.query.metaiNuoSeim;
  let metaiIkiSeim = req.query.metaiIkiSeim;




  //Metai nuo iki pradžia
  if (metaiNuoSeim === "undefined" || metaiNuoSeim == null) {
    metaiNuoSeim = 0
  } else {
    metaiNuoSeim = Number(req.query.metaiNuoSeim)
  }


  if (metaiIkiSeim === "undefined" || metaiIkiSeim == null || metaiIkiSeim === "") {
    metaiIkiSeim = 100
  } else {
    metaiIkiSeim = Number(req.query.metaiIkiSeim)
  }

  //Metai nuo iki pabaiga

  //Lytis pradžia
  if (lytis === undefined || lytis === "null") {
    lytis = ["vyras", "moteris", "nei vyras nei moteris", "nepažymėta"]
  } else {
    lytis = [req.query.lytis]
  }

  //Lytis pabaiga
  //Vardo filtravimas pradžia
  console.log(vardas)

  if (vardas === undefined || vardas === "") {
    vardas = ["Aldona", "Petras", "Ona", "Sandra", "Dainius"]
  } else {
    vardas = [req.query.seimininkoVardas]
  }

  console.log(vardas)
  //Vardo filtravimas pabaiga


  //Filtravimas pabaiga


  //Sortinimas pradžia
  let didejaMazejaSeim = req.query.didejaMazejaSeim;

  let rikiuotiPagalSeim = req.query.rikiavimoTvarkaSeim;

  if (didejaMazejaSeim === undefined || didejaMazejaSeim === "didejaSeim") {
    didejaMazejaSeim = 1
  } else {
    didejaMazejaSeim = -1
  }

  rikiuotiPagalSeim === undefined ? rikiuotiPagalSeim = "_id" : "null";

  //Sortinimas pabaiga

  res.render('seimininkai', {
    title: "Šeimininkai",
    seimininkai: await seimininkuDuomenys.find({ $and: [{ lytis: { $in: lytis } }, { amzius: { $gte: metaiNuoSeim, $lte: metaiIkiSeim } }, { vardas: { $in: vardas } }] }).sort({ [rikiuotiPagalSeim]: [didejaMazejaSeim] }).toArray()
  });
});


app.use('/api/seimininkai', routerSeim);
//Prisijungimas prie seimininku pabaiga

//Home puslapis pradžia
app.get('/home', async (req, res) => {
  res.render('home', {
    title: "Pagrindinis puslapis",

  });
});




//Home puslapis pabaiga





// Handle bars pabaiga
// app.use(express.static(path.resolve('public'), {
//   extensions: ['html']
// }));

app.listen(PORT, () => console.log(`Application is running on PORT ${PORT}`));

