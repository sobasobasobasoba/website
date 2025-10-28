const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Teddy1065Dredge!"
});

app.get('/api/hello', async (req, res) => {
    var query = "SELECT * FROM monitoring_redefined.matchups;";
    try {
        const [rows] = await con.query(query);
        res.set({"Access-Control-Allow-Origin": "*"})
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Database error'});
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));