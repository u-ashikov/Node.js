const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello stranger, this is Task Manager API!');
});

app.listen(port, () => { 
    console.log('Server is up and rinnning on port: ' + port); 
});