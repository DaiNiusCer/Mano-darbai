import express from "express";
import client from "../../mongoConnect.js";
import { ObjectId } from "mongodb";

const routerVardai = express.Router();

//Kolekcijos kintamasis
const collection = client.db("vardai_db").collection("vardai");

routerVardai.get('/', async (req, res) => {
  try {
    res.send(await collection.find().toArray())
  } catch (err) {
    res.status(500).send({ err });
  }
})

// Vardų trynimas per nuorodą iš DB
routerVardai.get('/delete/:id', async (req, res) => {
  try {
    await collection.deleteOne({ "_id": ObjectId(req.params.id) });
    res.redirect('/home');
  } catch (err) {
    res.status(500).send({ err });
  }
});
// Vardų trynimas per nuorodą iš DB

export default routerVardai