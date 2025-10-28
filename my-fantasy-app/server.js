const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/hello', (req, res) => {
    res.set({"Access-Control-Allow-Origin": "*"})
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Teddy1065Dredge!"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    res.send({express: 'Hello From Express'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));