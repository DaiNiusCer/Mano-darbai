import 'dotenv/config';
import express from 'express';
import path from 'path';
import barsRouter from './routes/api/bars.js';
import barsuiRouter from './routes/ui/barsui.js';
import registerRouter from './routes/api/register.js';
import loginRouter from './routes/api/login.js';
import cookieParser from 'cookie-parser';
import logoutRouter from './routes/api/logout.js';
import addbarRouter from './routes/ui/addbar.js';
//Moduliai

//Kontstantos
const PORT = process.env.PORT1 || 8080;
const app = express();
//Konstantos

//View engine EJS nustatymai
app.set('views', path.join('views'));
app.set('view engine', 'ejs');
//View engine EJS nustatymai

//Papildomi nustatymai
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))
app.use(cookieParser())

//Papildomi nustatymai

//Papildomu papkiu nurodymas
app.use(express.static('public'))
//Papildomu papkiu nurodymas

//Router nurodymas
app.use('/api/bars', barsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/addbar', addbarRouter);
app.use('/', barsuiRouter);
//Router nurodymas


//Serverio paleidimas
app.listen(PORT, console.log(`***Server is ON ${PORT} PORT***`))