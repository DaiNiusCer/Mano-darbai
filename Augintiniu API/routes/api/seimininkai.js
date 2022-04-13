import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import express from 'express';

const routerSeim = express.Router();

const client = new MongoClient(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

const seimininkuDuomenys = client.db('augintiniu_api').collection('seimininkai');

client.connect(err => {
  console.log(`Pavyko prisijungti prie DB naudojant URI: ${process.env.DB_URI}`);
});

//Visu seimininku isvedimas i ekrana
routerSeim.get('/', async (req, res) => {
  try {
    const data = await seimininkuDuomenys.find().toArray();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

//Nauju seimininku pridejimas prie saraso
routerSeim.post("/", async (req, res) => {
  try {
    let naujasSeimininkas = {
      vardas: req.body.seimininkoVardas,
      pavarde: req.body.seimininkoPavarde,
      amzius: req.body.regMetai,
      lytis: req.body.lytis

    };
    if (naujasSeimininkas.amzius >= 130) {
      return res.status(400).json({ msg: `Prašome įvesti teisingai amžių ` })
    }
    await seimininkuDuomenys.insertOne(naujasSeimininkas)
    res.redirect("/seimininkai")
  } catch (err) {
    res.status(500).send({ err })
  }


})


//Šeimininkų trynimo galimybė pradžia
routerSeim.get('/delete/:id', async (req, res) => {
  try {
    await seimininkuDuomenys.deleteOne({ "_id": ObjectId(req.params.id) });
    res.redirect('/seimininkai');
  } catch (err) {
    res.status(500).send({ err });
  }
});
//Šeimininkų trynimo galimybė pabaiga

export default routerSeim;
