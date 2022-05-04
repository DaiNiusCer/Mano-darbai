import 'dotenv/config';
import express from 'express';
import petsRouter from './routes/api/pets.js';
import medsRouter from './routes/api/medications.js';
import logsRouter from './routes/api/logs.js';
import presRouter from './routes/api/prescriptions.js';
import petsuiRouter from './routes/ui/petsui.js';
import { engine } from 'express-handlebars'
import logsuiRouter from './routes/ui/logsui.js';
import presuiRouter from './routes/ui/presui.js';
//Moduliai

//Serverio pakūrimas
const app = express()
const PORT = process.env.PORT0 || 8080

//Serverio pakūrimas
//CSS prijungimas
app.use(express.static('public'))
app.use(express.static('public/images'))


//Papildomi nustatymai
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
//Papildomi nustatymai

//Hnadle bars nustatymai
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//Hnadle bars nustatymai

// Papildomu puslapiu pridejimas iš hbs
app.get('/addpet', async (req, res) => {
  res.render('addpet', {
    title: "Add a new pet",
    styles: "main.css"
  });
});

app.get('/addpres', async (req, res) => {
  res.render('addpres', {
    title: "Add a new prescription",
    styles: "main.css"
  })
})

app.get('/addnewlog', async (req, res) => {
  res.render('addlog', {
    title: "Add a new pet log",
    styles: "main.css"
  })
})


// Papildomu puslapiu pridejimas iš hbs

//Pradedami naudoti routai
//Back end router/api
app.use('/v1/pets', petsRouter);
app.use('/v1/meds', medsRouter);
app.use('/v1/logs', logsRouter);
app.use('/v1/prescriptions', presRouter);
//Back end router/api

//UI routeriai
app.use('/pets', petsuiRouter);
app.use('/viewlogs', logsuiRouter);
app.use('/allpres', presuiRouter);
//UI routeriai
//Pradedami naudoti routai

app.listen(PORT, console.log(`Serveris veikia ${PORT} portu`))