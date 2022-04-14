//Sukeliami visi moduliai
import express from "express";
import 'dotenv/config';
import cors from 'cors';
import routerVardai from './routes/api/vardai.js';
import { engine } from 'express-handlebars';
import client from "./mongoConnect.js";
//Sukeliami visi moduliai pabaiga

//Papildomi kintamieji pradžia
const PORT = process.env.PORT || 5000
const app = express();
const vardaiDuombaze = client.db("vardai_db").collection("vardai")
//Papildomi kintamieji pabaiga


//Usiuku nustatymai pradžia
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//Usiuku nustatymai pabaiga

//Papildomų folderių pridėjimas
app.use(express.static('public'))
app.use(express.static('public/img'))
//Papildomų folderių pridėjimas pabaiga

//Papildomi nustatymai pradžia
const corsOptions = {
  origin: `http://localhost:${PORT}`,
  optionSuccessStatus: 200
}
//Papildomi saugumo nustatymai
app.use(cors(corsOptions));
//Tam kad būtų galima naudoti json formatą
app.use(express.json());
//Tam, kad būtų galima encodinti
app.use(express.urlencoded({
  extended: false
}));

app.get('/home', async (req, res) => {
  //Sortinimo kintamieji pradžia
  let rikiavimasDidejantMazejant = req.query.rikiavimasDidejantMazejant;
  let rikiavimasPagalVarda = req.query.rikiavimasPagalVarda;
  //Sortinimo kintamieji pabaiga
  //Soritinimo sąlygos pradžia
  if (rikiavimasDidejantMazejant === undefined || rikiavimasDidejantMazejant === "dideja") {
    rikiavimasDidejantMazejant = 1
  } else {
    rikiavimasDidejantMazejant = -1
  }
  if (rikiavimasPagalVarda === undefined || rikiavimasPagalVarda === "null") {
    rikiavimasPagalVarda = "_id"
  } else {
    rikiavimasPagalVarda = "vardas"
  }
  //Sortinimo sąlygos pabaiga

  //Filtravimo kintamieji
  let vardas = req.query.vardoRaides
  console.log(vardas)
  //Filtravimo kintamieji

  //Filtravimo sąlygos
  if (vardas === undefined || vardas === "") {
    vardas = ["Antanas"]
  } else {
    vardas = [req.query.vardoRaides]
  }

  //Filtravimo sąlygos

  res.render('vardai', {
    title: "Surask savo vardą",
    vardai: await vardaiDuombaze.find({ vardas: { $in: vardas } }).sort({ [rikiavimasPagalVarda]: [rikiavimasDidejantMazejant] }).toArray()

  });
});
//Papildomi nustatymai pabaiga

app.use('/api/vardai', routerVardai)

//Serverio pakurimas pradžia
app.listen(PORT, console.log(`Serveris paleistas ir veikia ant ${PORT} porto`))

//Serverio pakūrimas pabaiga
