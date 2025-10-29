import express from "express";
//import cors from "cors";
import mysql from "mysql2";
import async from "async";

const port = process.env.PORT || 5000;
const app = express();
//app.use(cors());
app.use(express.json());


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

    var query = "SELECT * FROM monitoring_redefined.matchups;";
    res.set({"Access-Control-Allow-Origin": "*"});
    
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
    console.log("TEAM");
    console.log(team);
    res.set({"Access-Control-Allow-Origin": "*"});


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

    var blowoutQuery = "SELECT *, winningTeamPoints - losingTeamPoints AS point_diff FROM monitoring_redefined.matchups ORDER BY point_diff DESC LIMIT 10;";
    var closestQuery = "SELECT *, winningTeamPoints - losingTeamPoints AS point_diff FROM monitoring_redefined.matchups ORDER BY point_diff ASC LIMIT 10;";
    let queryOutput = {};
    res.set({"Access-Control-Allow-Origin": "*"});

    async.parallel([
       function(parallel_done) {
           db.query(blowoutQuery, {}, function(err, results) {
               if (err) return parallel_done(err);
               queryOutput.blowout = results;
               console.log(results);
               parallel_done();
           });
       },
       function(parallel_done) {
           db.query(closestQuery, {}, function(err, results) {
               if (err) return parallel_done(err);
               queryOutput.closest = results;
               console.log(results);
               parallel_done();
           });
       }
    ], function(err) {
         if (err) console.log(err);
         console.log("parallel_done");
         console.log(queryOutput);
         res.set({"Access-Control-Allow-Origin": "*"});
         res.send(queryOutput);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));