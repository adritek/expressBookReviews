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
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
