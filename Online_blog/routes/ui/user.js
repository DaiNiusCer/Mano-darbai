import express from "express";
import isAuth from '../../isAuth.js';
import connect from "../../mySQLcon.js";


const router = express.Router()

router.get('/', async (req, res) => {
  try {

    const auth = await isAuth(req)
    let rikiuotiPagal = req.query.rikiuotiPagal;
    let kokiaTvarkaRikiuoti = req.query.rikiavimas;

    if (rikiuotiPagal === undefined || rikiuotiPagal === "null") {
      rikiuotiPagal = "id"
    } else {
      rikiuotiPagal = req.query.rikiuotiPagal
    }

    if (kokiaTvarkaRikiuoti === "mazejanti") {
      kokiaTvarkaRikiuoti = "DESC"
    } else {
      kokiaTvarkaRikiuoti = "ASC"
    }


    const [data] = await connect.query(`
    SELECT 
blog.id,
blog.title,
blog.content 
FROM blogs.blog JOIN user ON user.id=blog.author_id WHERE author_id=${req.token.id} ORDER BY ${rikiuotiPagal} ${kokiaTvarkaRikiuoti}`);
    res.render('userint', { blogs: data, title: "Our's all content", auth: auth, token: req.token })
  } catch (err) {
    console.log("Error home page ui")
    res.send({ err: `Error: ${err}` })
  }
})


export default router