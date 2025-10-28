//const express = import('express');
//const bodyParser = import('body-parser');
//const mysql = import('mysql2');
// import express from 'express';
// import bodyParser from 'body-parser';
// import mysql from 'mysql2';


// const app = express();
// const port = process.env.PORT || 5000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// const con = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Teddy1065Dredge!"
// });

// app.get('/api/hello', async (req, res) => {
//     var query = "SELECT * FROM monitoring_redefined.matchups;";
//     try {
//         const [rows] = await con.query(query);
//         res.set({"Access-Control-Allow-Origin": "*"})
//         res.json(rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({error: 'Database error'});
//     }
// });

// app.listen(port, () => console.log(`Listening on port ${port}`));

import express from "express";
//import cors from "cors";
import mysql from "mysql2";

const port = process.env.PORT || 5000;
const app = express();
//app.use(cors());
app.use(express.json());

// create db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Teddy1065Dredge!",   // ← replace with your MySQL password
  database: "monitoring_redefined" // ← replace with your DB name
});

// connect to db
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// simple GET endpoint
app.get("/api/hello", (req, res) => {
    var query = "SELECT * FROM monitoring_redefined.matchups;";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database query error:", err);
            res.set({"Access-Control-Allow-Origin": "*"})
            res.status(500).json({ error: "Database error" });
        }   else {
            res.set({"Access-Control-Allow-Origin": "*"})
            res.json(results);
        }
    });
});

// return all matchups from this team
app.get("/api/team", (req, res) => {
    var team = req.query.team;
    if (!/^[a-zA-Z]+$/.test(team)){
        console.error("Not a real team", err);
        res.set({"Access-Control-Allow-Origin": "*"})
        res.status(500).json({ error: "Not a real team" });
    } else {
        var query = `SELECT * FROM monitoring_redefined.matchups WHERE winningTeam = ${team} OR losingTeam = ${team};`;
        db.query(query, (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                res.set({"Access-Control-Allow-Origin": "*"})
                res.status(500).json({ error: "Database error" });
            }   else {
                res.set({"Access-Control-Allow-Origin": "*"})
                res.json(results);
            }
        });
    }

});

app.listen(port, () => console.log(`Listening on port ${port}`));