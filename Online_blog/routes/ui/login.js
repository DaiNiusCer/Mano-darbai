import express from 'express'
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import connect from '../../mySQLcon.js';

const router = express.Router();
router.use(cookieParser())

router.get('/', async (req, res) => {
  try {
    res.render('login', { title: "Login to see our features!" })
  }
  catch (err) {
    res.send({ err: `${err}` })
  }

})

router.post('/', async (req, res) => {
  try {

    const [data] = await connect.query(`SELECT*FROM blogs.user WHERE name=?`, [req.body.name])


    if (data.length === 0) {
      return res.status(400).send({ err: `Wrong name or password` })
    }

    const match = await bcrypt.compare(req.body.password, data[0].password)


    if (match) {
      const token = jwt.sign({ id: data[0].id, email: data[0].email, name: data[0].name }, process.env.ACCESS_SECRET_TOKEN)

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .redirect('/user')


    } else {
      res.send({ err: `Wrong name or password` })
    }


  } catch (err) {
    res.status(400).send({ err: `Error :${err}` })
  }

})





export default router