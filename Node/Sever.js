
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
    database: "nodejs"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
app.get("/", (req, res) => {
    res.json({ message: "Welcome to register application." });
});

app.post('/register', function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const add = req.body.add;
    const utype = req.body.utype;
    const lang = req.body.lang;
    const email = req.body.email;
    const pass = req.body.pass;

    con.query("INSERT INTO user (fname, lname, address, usertype,langauge,email,password) values(?,?,?,?,?,?,?)", [fname, lname, add, utype, lang, email, pass],
        (err, result) => {
            console.log(err);
            console.log("Number of records inserted: " + result.affectedRows);
        }
    );
});

app.post('/login', function (req, res) {
    const email = req.body.loginemail;
    const password = req.body.loginpassword;

    con.query("SELECT * FROM user WHERE email=? AND password=?",
        [email, password],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong Email and Password" });
            }
        }
    );

});
app.get('/getuserrecord', function (req, res) {

    con.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    }
    );

});

//here get cart no
app.post('/getcartno', function (req, res) {
    const cartno = req.body.cartnumber;

    con.query("SELECT CartNo FROM cart WHERE CartNo=?",
        [cartno],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Invalid Cart Number" });
            }
        }
    );

});
//here get product info
app.get('/getproduct', function (req, res) {
    const pname = req.body.pname;
    con.query("SELECT * FROM Product WHERE ProductName=?",
        [pname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        }
    );


});
app.get('/getproductOne', function (req, res) {
    const pname = req.body.pname;
    con.query("SELECT * FROM product WHERE ProductName=?",
        [pname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        }
    );

});
app.get('/getproductsecond', function (req, res) {
    const pname = req.body.pname;
    con.query("SELECT * FROM Product WHERE ProductName=?",
        [pname],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
                console.log(result);
            }
        }
    );

});
app.listen(3001, () => {
    console.log("sever running at 3001");
});
