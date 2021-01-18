let myLibrary = [];
const libraryDisplay = document.getElementById("library-container");

function Book(title, author, readStatus) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
}

function addBookToLibrary() {  
    let title = document.getElementById("book-title").value;
    let author = document.getElementById("author").value;
    let readStatus = document.getElementById("read-status").value;
    let newBook = new Book(title, author, readStatus);
    myLibrary.push(newBook);
    saveToLocal();
    clearForm();
    populateDisplay();
}

function clearForm() {
    document.getElementById("book-title").value = "";
    document.getElementById("author").value = "";
}

function createCard(book) {
    const card = document.createElement("div");
    const title = document.createElement("div");
    const author = document.createElement("div");
    const readToggle = document.createElement("div");
    const deleteBook = document.createElement("button");

    card.classList.add("book-card");
    title.classList.add("book-card-title");
    author.classList.add("book-card-author");
    readToggle.classList.add("book-card-read-status");
    deleteBook.classList.add("book-card-delete-button");

    title.textContent = book.title;
    author.textContent = "by " + book.author;
    readToggle.textContent = book.readStatus;
    deleteBook.textContent = "Delete book";

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(readToggle);
    card.appendChild(deleteBook);
    libraryDisplay.appendChild(card);
} 

function inputCheck() {
    let title = document.getElementById("book-title");
    let author = document.getElementById("author");

    if(title.value == "" || author.value == "") {
        alert("Please fill the required fields");
        return false;
    }
    else {
        addBookToLibrary();
    }
}

function clearDisplay() {
    libraryDisplay.innerHTML = "";
}

function populateDisplay() {
    clearDisplay();
    myLibrary.forEach(createCard);
}

function getBookFromLibrary(myLibrary, name) {
    for(book of myLibrary) {
        if(book.title === name) {
            return myLibrary.indexOf(book);
        }
    }
}

function deleteBook(targetBook) {
    myLibrary.splice(targetBook, 1);
    saveToLocal();
}

function flipReadStatus(targetBook) {
    if (book.readStatus === "Read") {
        book.readStatus = "Not read";
    }
    else if (book.readStatus === "Not read") {
        book.readStatus = "Read"
    }
    saveToLocal();
    populateDisplay();
}

/* EVENT LISTENERS*/
let submitButton = document.getElementById("submit-button");

document.addEventListener('keyup',function(e){
    if (e.keyCode === 13) {
        inputCheck();
        document.getElementById("book-title").focus();
    }
});

submitButton.addEventListener("click", inputCheck);

libraryDisplay.addEventListener("click", (e) => {
    const currentTarget = e.target.parentNode.firstChild;
    if (e.target.textContent === "Delete book") {
        deleteBook(getBookFromLibrary(myLibrary, currentTarget.textContent));
    }
    else if (e.target.textContent === "Read" || e.target.textContent == "Not read") {
        flipReadStatus(getBookFromLibrary(myLibrary, currentTarget.textContent));
    }
    populateDisplay();
});

  /* STORAGE FUNCTIONS*/
function saveToLocal() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
  
function restoreFromLocal() {
    myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
    if (myLibrary === null) myLibrary = [];
    populateDisplay();
}

restoreFromLocal();

