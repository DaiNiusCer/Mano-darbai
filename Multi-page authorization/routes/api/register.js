import express from 'express';
import session from 'express-session';
import connect from '../../mySQLcon.js';
import bcrypt from 'bcrypt';
import flash from 'connect-flash'



const router = express.Router()
//Flash žinutė aišku nebūtina, tačiau nice to have, kad rodytų pranešimus
router.use(flash())
router.use(session({
  secret: 'something',
  cookie: { maxAge: 60000 },
  resave: true,
  saveUninitialized: true
}));

//Vartotojo registracijos puslapio atvaizdavimas pradžia
//Šitoj vietoj taip pat renderini flash žinutę
router.get('/', async (req, res) => {
  try {
    const userEmail = req.flash('email')
    res.render('register', { title: "Register to get more features!", userEmail })
  }
  catch (err) {
    res.send({ err: `${err}` })
  }

})
//Vartotojo registracijos puslapio atvaizdavimas pabaiga

//Registruojamas vartotojas ir jo duomenys įrašomi į duomenų bazę
router.post('/', async (req, res) => {
  try {
    const encryptedPass = await bcrypt.hash(req.body.password, 10)

    if (validation(req.body)) {
      await connect.query(`INSERT INTO bars.users(email,password) VALUES(?,?)`, [req.body.email, encryptedPass])

      req.flash('email', req.body.email)
      res.redirect('/register')
    } else {
      res.send('Password does not match or email existing already')
    }
  } catch (err) {
    res.status(500).send({ err: `${err}` })

  }
});

//Vartotojo slaptažodžio patikrinimas pagal tam tikrus reikalavimus, jų gali būti ir daugiau arba mažiau
function validation(body) {
  if (body.email.includes('@') && body.password === body.repeatedPassword && body.password.length >= 6 && /[0-9]/.test(body.password) && /[A-Z]/.test(body.password) && /[a-z]/.test(body.password)) {
    console.log("Slaptažodis yra tinkamas")
    return true
  }
  console.log("Slaptažodis yra netinkamas")
  return false

};

export default router