//Element Selectors
const dialog = document.querySelector('dialog');
const azSort = document.querySelector('.sort-az');
const zaSort = document.querySelector('.sort-za');
const sortCriteria = document.querySelector('#sort-criteria');
const libraryTable = document.querySelector('tbody');
const addBookButton = document.querySelector('.add-new');

//Creates library object
const library = {
    books: [],
    sortOrder: 'az',
    sortType: 'title',
};
//Method to add book to library
library.addBook = function(book) {
    this.books.push(book);
};

//Method to delete book from library
library.removeBook = function(book) {
    const index = this.books.indexOf(book);
    if (index > -1){
        this.books.splice(index, 1);
    }
};

//Method to sort books in library
library.sortBooks = function(order=this.sortOrder, parameter=this.sortType){
    if(order === 'az'){
        this.books.sort((a,b)=>{
            if(a[parameter]<b[parameter]){
                return -1;
            } else if (a[parameter]>b[parameter]){
                return 1;
            } else
            return 0;
        })
    } else {
        this.books.sort((a,b)=>{
            if(a[parameter]<b[parameter]){
                return 1;
            } else if (a[parameter]>b[parameter]){
                return -1;
            } else
            return 0;
        })
    }
};

//Creates book constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.status = status;
    
    //Creates HTML row element
    this.row = document.createElement('tr');
    
    this.tdTitle = document.createElement('td');
    this.tdAuthor = document.createElement('td');
    this.tdPages = document.createElement('td');
    this.tdStatus = document.createElement('td');
    
    this.tdTitle.textContent = this.title;
    this.tdAuthor.textContent = this.author;
    this.tdPages.textContent = String(this.pages);
    this.tdStatus.textContent = this.status;

    this.row.appendChild(this.tdTitle);
    this.row.appendChild(this.tdAuthor);
    this.row.appendChild(this.tdPages);
    this.row.appendChild(this.tdStatus);

    //Adds edit button
    this.tdEdit = document.createElement('td');
    this.editButton = document.createElement('button');
    this.editButton.classList.add('edit');
    this.editButton.innerHTML = '<img src="./images/pencil.svg" alt="edit"></img>';
    this.tdEdit.appendChild(this.editButton);
    this.row.appendChild(this.tdEdit);  

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
