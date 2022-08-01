const express = require('express');
const app = express();

const port = 3000;

//Going with database
const db=require('./database');

//Initialize the database
db.init();

//Middlewares
app.use(express.static('public'));
app.use(express.json());

const api=require('./routes/api');

app.get('/', (req, res) => res.send('Its working!'));

app.use('/api',api);



app.listen(port, () => {

	console.log(`Example app listening at http://localhost:${port}`)
})