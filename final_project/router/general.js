const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let booksArray = Object.values(books);

public_users.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username === undefined){
        return res.send(`Username not provided, enter a username.`);
    } else if (password === undefined) {
        return res.send(`Password not provided, enter a password`);
    }

    if (isValid(username)) {
        return res.send(`Username: ${username} already exists`);
    } else {
        users.push(username);
        console.log("Users: ", users);
        res.send(`Username: ${username} added to DB`)
    }
    


});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    let author = req.params.author;
    let filterByAuthor = booksArray.filter((book) => book.author === author);
    res.send(filterByAuthor);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    let title = req.params.title;
    let filterByTitle = booksArray.filter((book) => book.title === title);
    res.send(filterByTitle);
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
