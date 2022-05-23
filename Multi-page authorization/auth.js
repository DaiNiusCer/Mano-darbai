
import jwt from 'jsonwebtoken';



export default function auth(req, res, next) {
  if (req.cookies.access_token) {
    const token = req.cookies.access_token
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, result) => {
      if (err) return res.redirect('/')
      req.token = result
      next()
    })
  } else {
    console.log('err verify')
    res.redirect('/')
  }
}