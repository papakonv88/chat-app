const path = require('path');

const express = require('express');

var app = express();

const publicPath = path.join(__dirname + './../public');
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('/', (req, res)=> {
   res.send('index.html'); 
});

app.listen(PORT, ()=> {
   console.log(`App listen to port ${PORT}`); 
});