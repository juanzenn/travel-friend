// The server xd
const express = require('express')
const exphbs = require('express-handlebars');
const {  db } = require('./firebaseInit');
const app = express()
const port = 3000

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

// Render the homepage
app.get('/', (req, res) => {
  db.collection('travels').get()
    .then((snapshot) => {
      const items = []
      snapshot.forEach((doc) => {
        items.push(doc.data())
      })
      res.render('home', {
        travels: items
      })
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    })
})
// Routes for our app :)
app.get('/contacto', (req, res) => {
  res.render('contact')
})

app.get('/nosotros', (req, res) => {
  res.render('us')
})

app.get('/preguntas_frecuentes', (req, res) => {
  res.render('questions')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

