const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.send('ok');
})


app.listen('3000', () => { 
    console.log('back-end started on port 3000 🚀')
})