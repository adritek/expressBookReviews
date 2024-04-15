const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

//returns boolean
const isValid = (username) => {
    // is username in users
    let hasUsername = users.filter((user) =>  user.username === username);

    // if username exists
    if (hasUsername.length > 0) {
        return true;
    } else {
        return false;
    };
}

//returns boolean
const authenticatedUser = (username, password) => {
    let validUser = users.filter((user) => {
        return (user.username === username && user.password === password);
    });

    if (validUser.length > 0) {
        return true;
    } else {
        return false;
    };
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // validation check username and password exist
    if (!username || !password) {
        return res.status(400).json({message: `Problem logging in - check username and password`});
    }

    // validation check on auth user
    if (authenticatedUser(username, password)){
        let accessToken = jwt.sign(
            {data: password},
            'access',
            {expiresIn: 60 * 60}
        );

        req.session.authorization = {
            accessToken,
            username
        }

        return res.status(200).send(`${username} successfully logged in`);
    } else {
        return res.status(208).json({message: 'Invalide login, check username and password'})
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
