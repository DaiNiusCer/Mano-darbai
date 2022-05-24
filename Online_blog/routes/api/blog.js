import express from 'express'
import connect from '../../mySQLcon.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [data] = await connect.query("SELECT*FROM blogs.blog")
    res.send(data)
  } catch (err) {
    console.log("Gavai klaidą /api/blog")
    res.send({ err: `Error: ${err}` })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [data] = await connect.query(`SELECT * FROM blogs.blog WHERE id= ?`, [req.params.id])
    if (data.length === 0) {
      res.send("Wrong id, try another one")
    } else {
      res.send(data)
    }

  } catch (err) {
    console.log("Error")
    res.send({ err: `Error: ${err}` })
  }
})



export default router