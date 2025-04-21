function showSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}
document.addEventListener("DOMContentLoaded", () => {
const memberList = document.getElementById("member-list");

// Fetch all members
fetch('get_members.php')
.then(response => response.json())
.then(members => {
    memberList.innerHTML = ""; // Clear any existing data
    members.forEach(member => {
        const li = document.createElement("li");
        li.innerHTML = `${member.name} (${member.email}) 
            <button onclick="editMember(${member.member_id})">Edit</button> 
            <button onclick="deleteMember(${member.member_id})">Delete</button>`;
        memberList.appendChild(li);
    });
})
.catch(error => console.error('Error loading members:', error));

// Handle Add Member form submission
document.getElementById("add-member-form").addEventListener("submit", function (e) {
e.preventDefault(); // Prevent default form submission

const name = e.target.querySelector("input[placeholder='Name']").value;
const email = e.target.querySelector("input[placeholder='UserID']").value;
const password = e.target.querySelector("input[placeholder='Password']").value;

const memberData = {
    name: name,
    email: email,
    password: password
};

fetch("add_member.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberData)
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    location.reload(); // Reload the page to get updated list of members
})
.catch(error => console.error('Error adding member:', error));
});
});

// Edit member function
function editMember(memberId) {
const memberName = prompt("Enter new name:");
const memberEmail = prompt("Enter new email:");

const updatedData = {
member_id: memberId,
name: memberName,
email: memberEmail,

};

fetch("update_member.php", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(updatedData)
})
.then(response => response.json())
.then(data => {
alert(data.message);
location.reload(); // Reload to see updated members list
})
.catch(error => console.error('Error editing member:', error));
}

// Delete member function
function deleteMember(memberId) {
if (confirm("Are you sure you want to delete this member?")) {
fetch("delete_member.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ member_id: memberId })
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    location.reload(); // Reload to get updated list of members
})
.catch(error => console.error('Error deleting member:', error));
}
}
document.addEventListener("DOMContentLoaded", () => {
const bookList = document.getElementById("book-list");

// Fetch all books
fetch('get_books.php')
.then(response => response.json())
.then(books => {
    bookList.innerHTML = ""; // Clear any existing data
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerHTML = `${book.title} by ${book.author} (ISBN: ${book.isbn}) 
            <button onclick="editBook(${book.book_id})">Edit</button> 
            <button onclick="deleteBook(${book.book_id})">Delete</button>`;
        bookList.appendChild(li);
    });
})
.catch(error => console.error('Error loading books:', error));

// Handle Add Book form submission
document.getElementById("add-book-form").addEventListener("submit", function (e) {
e.preventDefault(); // Prevent default form submission

const title = e.target.querySelector("input[placeholder='Title']").value;
const author = e.target.querySelector("input[placeholder='Author']").value;
const genre = e.target.querySelector("input[placeholder='Genre']").value;
const isbn = e.target.querySelector("input[placeholder='ISBN']").value;
const publicationYear = e.target.querySelector("input[placeholder='Publication Year']").value;

const bookData = {
    title: title,
    author: author,
    genre: genre,
    isbn: isbn,
    publication_year: publicationYear
};

fetch("add_book.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData)
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    location.reload(); // Reload the page to get updated list of books
})
.catch(error => console.error('Error adding book:', error));
});
});

// Edit book function
function editBook(bookId) {
const bookTitle = prompt("Enter new title:");
const bookAuthor = prompt("Enter new author:");
const bookGenre = prompt("Enter new genre:");
const bookIsbn = prompt("Enter new ISBN:");
const bookPublicationYear = prompt("Enter new publication year:");

const updatedData = {
book_id: bookId,
title: bookTitle,
author: bookAuthor,
genre: bookGenre,
isbn: bookIsbn,
publication_year: bookPublicationYear
};

fetch("update_book.php", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(updatedData)
})
.then(response => response.json())
.then(data => {
alert(data.message);
location.reload(); // Reload to see updated books list
})
.catch(error => console.error('Error editing book:', error));
}

// Delete book function
function deleteBook(bookId) {
if (confirm("Are you sure you want to delete this book?")) {
fetch("delete_book.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ book_id: bookId })
})
.then(response => response.json())
.then(data => {
    alert(data.message);
    location.reload(); // Reload to get updated list of books
})
.catch(error => console.error('Error deleting book:', error));
}
}
document.addEventListener("DOMContentLoaded", () => {
// Fetch all transactions when the page loads
fetchTransactions();
});

// Fetch all transactions from the server
function fetchTransactions() {
const transactionList = document.getElementById("transaction-list");

// Make a request to the PHP endpoint to get transactions
fetch('get_transactions.php')
.then(response => response.json())
.then(transactions => {
    transactionList.innerHTML = ""; // Clear the list before populating

    if (transactions.length === 0) {
        transactionList.innerHTML = "<li>No transactions found.</li>";
    } else {
        transactions.forEach(transaction => {
            const li = document.createElement("li");
            const dueDate = transaction.return_date ? transaction.return_date : "Not returned yet";
            li.textContent = `${transaction.member_name} borrowed "${transaction.title}", Borrowed on ${transaction.borrow_date}, Due on ${dueDate}`;
            transactionList.appendChild(li);
        });
    }
})
.catch(error => console.error('Error fetching transactions:', error));
}