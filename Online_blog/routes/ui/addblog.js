import express from 'express';
import connect from '../../mySQLcon.js';
import auth from '../../auth.js'

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    res.render('addblog', { title: "Add a new blog !" })

  } catch (err) {
    console.log(`Klaida addblog puslapyje: ${err}`)
    res.send({ err: `Gavai klaidą addblog dalyje: ${err}` })
  }
})

router.post("/", auth, async (req, res) => {
  try {

    let title = req.body.title;
    let content = req.body.content;


    if (title === "") {
      res.send('Please provide blog title')
    }
    else if (content === "") {
      res.send('Please write something')
    } else {
      const data = await connect.query(`INSERT INTO blogs.blog SET ?`, {
        author_id: req.token.id,
        title: title,
        content: content
      })

      res.redirect('/user')

    }


  } catch (err) {
    console.log(`Klaida addbar puslapyje: ${err}`)
    res.send({ err: `Gavai klaidą addbar dalyje: ${err}` })
  }
})

router.delete("/blogs/:id", async (req, res) => {
  try {
    const data = await connect.query(`DELETE FROM blogs.blog WHERE id =?`, [req.params.id])
    res.send(data)


  } catch (err) {
    console.log(`Klaida addblog puslapyje: ${err}`)
    res.send({ err: `Gavai klaidą addblog dalyje: ${err}` })
  }
})

export default router