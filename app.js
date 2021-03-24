// The server 
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const exphbs = require('express-handlebars');
const {  db } = require('./firebaseInit');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json');
const { auth } = require('./firebaseInit');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})


const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/signup', (req,res) => {
  auth.createUserWithEmailAndPassword(req.body.email, req.body.password)  
  .catch((error) => {
    console.error(error)
  })
  res.redirect({user:true},'/')
})

app.post('/login', (req,res) => {
  auth.signInWithEmailAndPassword(req.body.email, req.body.password)
  .catch((error) => {
    console.error(error)
  });
  res.redirect('/')
})


auth.onAuthStateChanged(user => {
  if (user) {
    // User is signed in.
    console.log(`there is a user with the email of: ${auth.currentUser.email}`)
  } else {
    console.log('there is no user')
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

