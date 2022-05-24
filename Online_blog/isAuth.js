import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async function isAuthed(req) {

  if (req.cookies.access_token) {
    const token = req.cookies.access_token;
    const bool = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, result) => {
      if (err) return false
      req.token = result
      return true
    })
    return bool
  } else {
    return false
  }
}
