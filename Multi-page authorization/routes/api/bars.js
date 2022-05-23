//Šitas skirtas tik pasitikrinti ar veikia SQL, nieko neatlieka

import express from 'express';
import connect from '../../mySQLcon.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM bars`)
    res.send(data)
  } catch (err) {
    console.log(`${err}`)
    res.send({ err: `${err}` })
  }
})

export default router