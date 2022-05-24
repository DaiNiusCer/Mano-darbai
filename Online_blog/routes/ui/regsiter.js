import express from 'express';
import session from 'express-session';
import connect from '../../mySQLcon.js';
import bcrypt from 'bcrypt';
import flash from 'connect-flash'

const router = express.Router()

router.use(flash())
router.use(session({
  secret: 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

router.get('/', async (req, res) => {
  try {
    const userName = req.flash('name')
    res.render('register', { title: "Register to get more features!", userName })
  }
  catch (err) {
    res.send({ err: `${err}` })
  }

})

router.post('/', async (req, res) => {
  try {
    const encryptedPass = await bcrypt.hash(req.body.password, 10)

    if (validation(req.body)) {
      await connect.query(`INSERT INTO blogs.user(name,email,password) VALUES(?,?,?)`, [req.body.name, req.body.email, encryptedPass])

      req.flash('name', req.body.name)
      res.redirect('/register')
    } else {
      res.send('Password does not match or email existing already')
    }
  } catch (err) {
    res.status(500).send({ err: `${err}` })

  }
});

function validation(body) {
  if (body.email.includes('@') && body.password === body.repeatedPassword && body.password.length >= 6 && /[0-9]/.test(body.password) && /[A-Z]/.test(body.password) && /[a-z]/.test(body.password)) {
    console.log("Slaptažodis yra tinkamas")
    return true
  }
  console.log("Slaptažodis yra netinkamas")
  return false

};

export default router