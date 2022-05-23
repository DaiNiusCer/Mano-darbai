import express from 'express'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connect from '../../mySQLcon.js';



const router = express.Router();
router.use(cookieParser())


//Login puslapio atvaizdavimas
router.get('/', async (req, res) => {
  try {
    res.render('login', { title: "Login to see our features!" })
  }
  catch (err) {
    res.send({ err: `${err}` })
  }

})
//Login ir cookie sukurimas

router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const [data] = await connect.query(`SELECT*FROM bars.users WHERE email=?`, [req.body.email])

    //Pašto patikrinimas
    if (data.length === 0) {
      return res.status(400).send({ err: `Wrong email or password` })
    }
    //Slaptažodžio patikrinimas ar jis sutampa jau su įvestu
    const itIsAMatch = await bcrypt.compare(req.body.password, data[0].password)

    //Ir jeigu slaptažodis yra teisingas tada sukuriamas cookie
    if (itIsAMatch) {
      const token = jwt.sign({ id: data[0].id, email: data[0].email }, process.env.ACCESS_SECRET_TOKEN)

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .redirect('/')


    } else {
      res.send({ err: `Wrong email or password` })
    }


  } catch (err) {
    res.status(400).send({ err: `Neprisijungė,nes :${err}` })
  }

})





export default router