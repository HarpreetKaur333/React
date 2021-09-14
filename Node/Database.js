
const mysql = require('mysql');
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abc123",

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
con.query('CREATE DATABASE IF NOT EXISTS harpreet', function (err) {
    if (err) throw err;
    con.query('USE harpreet', function (err) {
        if (err) throw err;
        con.query('CREATE TABLE IF NOT EXISTS userinfo('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'fullname VARCHAR(500),'
            + 'email VARCHAR(500),'
            + 'org VARCHAR(500),'
            + 'orgunit VARCHAR(100),'
            + 'city VARCHAR(100),'
            + 'country VARCHAR(100),'
            + 'telephone  varchar(100)'
            + ')', function (err) {
                if (err) throw err;
            });
    });
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to harpreet  application." });
});

app.post('/register', function (req, res) {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const org = req.body.org;
    const orgunit = req.body.orgunit;
    const city = req.body.city;
    const country = req.body.country;
    const telephone = req.body.telephone;

    con.query("INSERT INTO userinfo (fullname, email, org, orgunit,city,country,telephone) values(?,?,?,?,?,?,?)", [fullname, email, org, orgunit, city, country, telephone],
        (err, result) => {
            console.log(err);
            console.log("Number of records inserted: " + result.affectedRows);
        }
    );
});

app.listen(3001, () => {
    console.log("sever running at 3001");
});
