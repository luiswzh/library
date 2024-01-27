//Element Selectors
const dialog = document.querySelector('dialog');
const azSort = document.querySelector('.sort-az');
const zaSort = document.querySelector('.sort-za');
const sortCriteria = document.querySelector('#sort-criteria');
const libraryTable = document.querySelector('table');
const addBookButton = document.querySelector('.add-new');

//Creates library object
const library = {
    books: [],
    sortOrder: 'az',
    sortType: 'title',
};
//Method to add book to library
library.addBook = function (book) {
    this.books.push(book);
}
//Creates book constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
};

//Sort order selection
//AZ sort:
azSort.addEventListener('click',()=>{
    azSort.classList.add('active');
    zaSort.classList.remove('active');
    library.sortOrder = 'az';
});
//ZA sort:
zaSort.addEventListener('click',()=>{
    zaSort.classList.add('active');
    azSort.classList.remove('active');
    library.sortOrder = 'za';
});

//Sort type:
sortCriteria.addEventListener('change',()=>{
    library.sortType = sortCriteria.value;
});
