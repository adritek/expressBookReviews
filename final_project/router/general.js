const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let booksArray = Object.values(books);
const base_URL = "https://adritek-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/";

/*** 
If you're looking for Tasks 10-13 (Async/Await) 👇 scroll to the bottom 👇
***/

public_users.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // check if username and password are provided
    if (username === undefined){
        return res.send(`Username not provided, enter a username.`);
    } else if (password === undefined) {
        return res.send(`Password not provided, enter a password`);
    }

    // check if username is taken
    if (isValid(username)) {
        return res.send(`Username: ${username} already exists`);
    } else {
        users.push({"username": username,"password": password});
        console.log("Users: ", users);
        res.send(`Username: ${username} added to list of users`)
    }
});

// Get the book list available in the shop
public_users.get('/', (req, res) => {
    res.send(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    res.send(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    let author = req.params.author;
    let filterByAuthor = booksArray.filter((book) => book.author === author);
    res.send(filterByAuthor);
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
    let title = req.params.title;
    let filterByTitle = booksArray.filter((book) => book.title === title);
    res.send(filterByTitle);
});

//  Get book review
public_users.get('/review/:isbn', (req, res) => {
    let isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

/***************** 
*****************

All async/await functions for tasks 10-13 are here, note: they just log out to console

 *****************
*****************/

// Task 10
async function fetchAllBooks() {
    try {
        const response = await axios.get(base_URL);
        console.log("Get all the books with async/await and axios",response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
fetchAllBooks();

// Task 11 - get books by isbn
async function getBookByISBN() {
    try {
        const response = await axios.get(`${base_URL}/isbn/4`);
        console.log("Get book details based on ISBN with async/await and axios", response.data);
    } catch {
        console.error('Error fetching data:', error);
    }
}
getBookByISBN();

// Task 12 - get books by author
async function getBookByAuthor() {
    try {
        const response = await axios.get(`${base_URL}/author/Samuel%20Beckett`);
        console.log("Get book details based on Author with async/await and axios", response.data);
    } catch {
        console.error('Error fetching data:', error);
    }
}
getBookByAuthor();

// Task 13 - get book by title
async function getBookByTitle() {
    try {
        const response = await axios.get(`${base_URL}/title/Things%20Fall%20Apart`);
        console.log("Get book details based on Title with async/await and axios", response.data);
    } catch {
        console.error('Error fetching data:', error);
    }
}
getBookByTitle();

module.exports.general = public_users;
