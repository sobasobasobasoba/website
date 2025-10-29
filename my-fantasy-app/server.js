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
import async from "async";

const port = process.env.PORT || 5000;
const app = express();
//app.use(cors());
app.use(express.json());

// create db connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Teddy1065Dredge!",   // ← replace with your MySQL password
//   database: "monitoring_redefined" // ← replace with your DB name
// });

var db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "Teddy1065Dredge!",   // ← replace with your MySQL password
    database: "monitoring_redefined" // ← replace with your DB name
})

// connect to db


// simple GET endpoint
app.get("/api/matchups", (req, res) => {
    db.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            res.set({"Access-Control-Allow-Origin": "*"});
            res.status(500).json({error: "Can't connect to database"});
        } else {
            console.log("Connected to MySQL database");
        }
    });
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
    db.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            res.set({"Access-Control-Allow-Origin": "*"});
            res.status(500).json({error: "Can't connect to database"});
        } else {
            console.log("Connected to MySQL database");
        }
    });
    var team = req.query.team;
    console.log("TEAM");
    console.log(team);
    if (!(/^[a-zA-Z]+$/.test(team))){
        console.error("Not a real team");
        res.set({"Access-Control-Allow-Origin": "*"})
        res.status(500).json({ error: "Not a real team" });
    } else {
        var query = `SELECT * FROM monitoring_redefined.matchups WHERE winningTeam = '${team}' OR losingTeam = '${team}';`;
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

app.get("/api/records/matchup", (req, res) => {
    db.connect((err) => {
        if (err) {
            console.error("Error connecting to MySQL:", err);
            res.set({"Access-Control-Allow-Origin": "*"});
            res.status(500).json({error: "Can't connect to database"});
        } else {
            console.log("Connected to MySQL database");
        }
    });
    var blowoutQuery = "SELECT *, winningTeamPoints - losingTeamPoints AS point_diff FROM monitoring_redefined.matchups ORDER BY point_diff DESC LIMIT 10;";
    var closestQuery = "SELECT *, winningTeamPoints - losingTeamPoints AS point_diff FROM monitoring_redefined.matchups ORDER BY point_diff ASC LIMIT 10;";
    let queryOutput = {};

    async.parallel([
       function(parallel_done) {
           pool.query(blowoutQuery, {}, function(err, results) {
               if (err) return parallel_done(err);
               queryOutput.blowout = results;
               console.log(results);
               parallel_done();
           });
       },
       function(parallel_done) {
           pool.query(closestQuery, {}, function(err, results) {
               if (err) return parallel_done(err);
               queryOutput.closest = results;
               console.log(results);
               parallel_done();
           });
       }
    ], function(err) {
         if (err) console.log(err);
         pool.end();
         console.log("parallel_done");
         console.log(queryOutput);
         res.set({"Access-Control-Allow-Origin": "*"});
         res.send(queryOutput);
    });
    // db.query(blowoutQuery, (err, results) => {
    //     if (err) {
    //         console.error("Database query error:", err);
    //         res.set({"Access-Control-Allow-Origin": "*"})
    //         res.status(500).json({ error: "Database error" });
    //     }   else {
    //         console.log(results);
    //         queryOutput["blowout"] = results;
    //         //res.set({"Access-Control-Allow-Origin": "*"})
    //         //res.json(results);
    //     }
    // });
    // db.query(closestQuery, (err, results) => {
    //     if (err) {
    //         console.error("Database query error:", err);
    //         res.set({"Access-Control-Allow-Origin": "*"})
    //         res.status(500).json({ error: "Database error" });
    //     }   else {
    //         console.log(results);
    //         queryOutput["closest"] = results;
    //         //res.set({"Access-Control-Allow-Origin": "*"})
    //         //res.json(results);
    //     }
    // });
    // console.log(queryOutput);
    // res.set({"Access-Control-Allow-Origin": "*"});
    // res.json(queryOutput);

});

app.listen(port, () => console.log(`Listening on port ${port}`));