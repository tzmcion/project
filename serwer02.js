
var users = [];

var is_logged_in = false;

const fs = require('fs');

for (let a = 0; a < 6; a++) {
    users.push({
        user_ip: ("172.168.100." + a).toString(),
        user_name: ("Jake" + a).toString(),
        user_password: "We_Are_all_same_passwords",
        user_age: Math.floor(Math.random() * 20),
        user_student: Math.random() > 0.5 ? 'checked' : '',
        user_gender: Math.random() > 0.5 ? "havent't decided yet" : Math.random() > 0.75 ? 'female' : 'male',
        logon: false
    })
}

function HTMLtable_from_Array_of_Objects(array) {
    let finalstring = "";
    finalstring += "<body style='background:gray'>"
    const tr = "<tr>";
    const trend = "</tr>"
    const td = "<td style='border: 1px solid black; padding: 5px 10px 5px 10px; font-weight: 800; color: white'>";
    const tdend = "</td>"
    finalstring += "<table style='text-align:center; border: 2px solid yellow; margin: 20px auto'>"
    finalstring += "<tbody>"
    finalstring += tr;
    let names = ["ip_address", "UserName", "UserPassword", "Age", "Student?", "gender:", "isuserloggedin?"];
    for (let x = 0; x < names.length; x++) {
        finalstring += td;
        finalstring += names[x];
        finalstring += tdend;
    }
    finalstring += trend;
    array.map(user => {
        finalstring += tr
        Object.keys(user).forEach(function (el) {

            finalstring += td;
            if (el === "user_student") {
                finalstring += "Student : <input type='checkbox' " + user[el] + " disabled='true';>";
            } else {
                finalstring += user[el];
            }
            finalstring += tdend;
        })
        finalstring += trend
    })
    finalstring += "</tbody>"
    finalstring += "</table>"
    finalstring += "<ul style='margin: 10px auto; display:flex; flex-direction:row;width:400px;color:white;font-weight:500; justify-content:space-between;font-size: 1.8rem; '> <li><a href='/sort'>sort</a> </li><li><a href='/gender'>gender</a> </li><li><a href='/show'>show</a> </li></ul>"
    finalstring += "</body>"
    return finalstring;
}

function HTMLtable_gender(array) {
    let finalstring = "";
    finalstring += "<body style='background:gray'>"
    const tr = "<tr>";
    const trend = "</tr>"
    const td = "<td style='border: 1px solid black; padding: 5px 10px 5px 10px; font-weight: 800; color: white'>";
    const tdend = "</td>"
    finalstring += "<table style='text-align:center; border: 2px solid yellow; margin: 20px auto'>"
    finalstring += "<tbody>"
    finalstring += tr;
    let names = ["ip_address", "gender:"];
    for (let x = 0; x < names.length; x++) {
        finalstring += td;
        finalstring += names[x];
        finalstring += tdend;
    }
    finalstring += trend;
    array.map(user => {
        if (user.user_gender === "male") {
            finalstring += tr
            Object.keys(user).forEach(function (el) {

                if (el === 'user_ip' || el === 'user_gender') {
                    finalstring += td;
                    finalstring += user[el];
                    finalstring += tdend;
                }
            })
            finalstring += trend
        }
    })
    finalstring += "</tbody>"
    finalstring += "</table>"

    finalstring += "<table style='text-align:center; border: 2px solid yellow; margin: 20px auto'>"
    finalstring += "<tbody>"
    finalstring += tr;
    for (let x = 0; x < names.length; x++) {
        finalstring += td;
        finalstring += names[x];
        finalstring += tdend;
    }
    finalstring += trend;
    array.map(user => {
        if (user.user_gender === "female") {
            finalstring += tr
            Object.keys(user).forEach(function (el) {

                if (el === 'user_ip' || el === 'user_gender') {
                    if (user)
                        finalstring += td;
                    finalstring += user[el];
                    finalstring += tdend;
                }
            })
            finalstring += trend
        }
    })
    finalstring += "</tbody>"
    finalstring += "</table>"

    finalstring += "<table style='text-align:center; border: 2px solid yellow; margin: 20px auto'>"
    finalstring += "<tbody>"
    finalstring += tr;
    for (let x = 0; x < names.length; x++) {
        finalstring += td;
        finalstring += names[x];
        finalstring += tdend;
    }
    finalstring += trend;
    array.map(user => {
        if (user.user_gender === "havent't decided yet") {
            finalstring += tr
            Object.keys(user).forEach(function (el) {

                if (el === 'user_ip' || el === 'user_gender') {
                    if (user)
                        finalstring += td;
                    finalstring += user[el];
                    finalstring += tdend;
                }
            })
            finalstring += trend
        }
    })
    finalstring += "</tbody>"
    finalstring += "</table>"
    finalstring += "<ul style='margin: 10px auto; display:flex; flex-direction:row;width:400px;color:white;font-weight:500; justify-content:space-between;font-size: 1.8rem; '> <li><a href='/sort'>sort</a> </li><li><a href='/gender'>gender</a> </li><li><a href='/show'>show</a> </li></ul>"
    finalstring += "</body>"
    return finalstring;
}





function HTMLtable_sorted(arrays, boolup) {
    let newarray = []
    let myarr = new Array;
    arrays.map(e => {
        myarr.push(e);
    })
    let len = myarr.length, index;
    if (boolup) {
        for (let y = 0; y < len; y++) {
            let smallest = myarr[0];
            index = 0;
            for (let x = 0; x < myarr.length; x++) {
                if (myarr[x].user_age < smallest.user_age) {
                    smallest = myarr[x];
                    index = x;
                }
            }
            newarray.push(smallest);
            myarr.splice(index, 1);
        }
    } else {
        for (let y = 0; y < len; y++) {
            let smallest = myarr[0];
            index = 0;
            for (let x = 0; x < myarr.length; x++) {
                if (myarr[x].user_age > smallest.user_age) {
                    smallest = myarr[x];
                    index = x;
                }
            }
            newarray.push(smallest);
            myarr.splice(index, 1);
        }
    }
    const array = newarray;
    let finalstring = "";
    finalstring += "<body style='background:gray'>"
    const tr = "<tr>";
    const trend = "</tr>"
    const td = "<td style='border: 1px solid black; padding: 5px 10px 5px 10px; font-weight: 800; color: white'>";
    const tdend = "</td>"
    finalstring += "<table style='text-align:center; border: 2px solid yellow; margin: 20px auto'>"
    finalstring += "<tbody>"
    finalstring += tr;
    let names = ["ip_address", "UserName", "UserPassword", "Age", "Student?", "gender:", "isuserloggedin?"];
    for (let x = 0; x < names.length; x++) {
        finalstring += td;
        finalstring += names[x];
        finalstring += tdend;
    }
    finalstring += trend;
    array.map(user => {
        finalstring += tr
        Object.keys(user).forEach(function (el) {

            finalstring += td;
            if (el === "user_student") {
                finalstring += "Student : <input type='checkbox' " + user[el] + " disabled='true';>";
            } else {
                finalstring += user[el];
            }
            finalstring += tdend;
        })
        finalstring += trend
    })
    finalstring += "</tbody>"
    finalstring += "</table>"
    finalstring += "<form action='/sort' method='GET' style='margin 10px auto; text-align:center;' id='form'><label>rosnaca</label><input type='radio' name='which' value='true'><label>malejaca</label><input type='radio' name='which' value='false'></form>"
    finalstring += "<ul style='margin: 10px auto; display:flex; flex-direction:row;width:400px;color:white;font-weight:500; justify-content:space-between;font-size: 1.8rem; '> <li><a href='/sort'>sort</a> </li><li><a href='/gender'>gender</a> </li><li><a href='/show'>show</a> </li></ul>"
    finalstring += "<script src='./js/index.js'></script>";
    finalstring += "</body>"
    return finalstring;
}




var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000; // bardzo istotna linijka - port zostaje przydzielony przez Heroku

var path = require("path")
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/strona.html"))
})

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.get("/logout", function (req, res) {
    is_logged_in =
        res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.get("/admin", function (req, res) {
    let toresend;
    if (is_logged_in) {
        toresend = "/static/adminlogged.html"
    }
    else {
        toresend = "/static/admin.html";
    }
    res.sendFile(path.join(__dirname + toresend))
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.post("/HandleRegister", function (req, res) {
    const user_ip = req.connection.remoteAddress;
    const user_name = req.body.login;
    const user_password = req.body.password;
    const user_age = req.body.age;
    const user_student = req.body.student;
    const user_gender = req.body.gender;
    console.log(user_ip + " " + user_name);
    let does_exist = false;
    users.map(user => {
        if (req.body.login === user.user_name) {
            does_exist = true;
        }
    })
    if (!does_exist) {
        users.push({
            user_ip: user_ip,
            user_name: user_name,
            user_password: user_password,
            user_age: user_age,
            user_student: user_student ? 'checked' : '',
            user_gender: user_gender,
            logon: false
        })
    }
    console.log(users);
    if (!does_exist) {
        res.sendFile(path.join(__dirname + "/static/registered.html"))
    }
    else {
        res.sendFile(path.join(__dirname + "/static/index.html"))
    }

})

app.post("/HandleLogin", function (req, res) {
    let logged;
    users.map(user => {
        if (user.user_name === req.body.login && user.user_password === req.body.password) {
            user.logon = true;
            logged = "si";
            is_logged_in = true;
        }
    })
    console.log(users);
    if (logged === "si") {
        res.sendFile(path.join(__dirname + "/static/logon.html"));
    }
})


app.get("/sort", function (req, res) {
    if (is_logged_in) {
        let issmall = req.query.which === 'true' ? true : false;
        res.end(HTMLtable_sorted(users, issmall));
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"));
    }
})

app.get("/gender", function (req, res) {
    if (is_logged_in) {
        res.end(HTMLtable_gender(users));
    }
    else {
        res.sendFile(path.join(__dirname + "/static/admin.html"));
    }
})

app.get("/show", function (req, res) {
    if (is_logged_in) {
        res.end(HTMLtable_from_Array_of_Objects(users));
    } else {
        res.sendFile(path.join(__dirname + "/static/admin.html"));
    }
})
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

app.use(express.static(__dirname + '/static'));