const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

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
        con.query("SELECT * FROM monitoring_redefined.matchups", function (err, result) {
            if (err) throw err;
            console.log("Result: " + result);
        });
    });
    res.send(result);
});

app.listen(port, () => console.log(`Listening on port ${port}`));