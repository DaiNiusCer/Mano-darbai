import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import express from 'express';

const routerAug = express.Router();

//Mongo db kliento pakurimas
const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

const augintiniuDuomenys = client.db('augintiniu_api').collection('augintiniai');
//Mongo db kliento pakurimas

client.connect(err => {
  console.log(`Pavyko prisijungti prie DB naudojant URI: ${process.env.DB_URI}`);
});


//Naujų augintinių pridėjimas pradžia
routerAug.post("/", (req, res) => {

  let naujasAugintinis = {
    tipas: req.body.gyvunoTipas,
    vardas: req.body.gyvunoVardas,
    amzius: Number(req.body.gyvunoAmzius),
    skiepytas: req.body.skiepytas === "on" ? true : false
  }
  if (naujasAugintinis.amzius >= 35) {
    return res.status(400).json({ msg: `Prašome įvesti teisingą gyvūno amžių` })
  }
  client.db('augintiniu_api').collection('augintiniai').insertOne(naujasAugintinis)



  res.redirect("/augintiniai")

})
//Naujų augintinių pridėjimas pabaiga

//Augintinių trynimo galimybė pradžia
routerAug.get('/delete/:id', async (req, res) => {
  try {
    await augintiniuDuomenys.deleteOne({ "_id": ObjectId(req.params.id) });
    res.redirect('/augintiniai');
  } catch (err) {
    res.status(500).send({ err });
  }
});
//Augintinių trynimo galimybė pabaiga

//Rikiavimas pagal kelis properčius





export default routerAug;

/*
db.vehicleinformation.find({},{_id:0}).sort({"year":1})
*/