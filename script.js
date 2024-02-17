(function(){
//Element Selectors
const dialog = document.querySelector('dialog');
const azSort = document.querySelector('.sort-az');
const zaSort = document.querySelector('.sort-za');
const sortCriteria = document.querySelector('#sort-criteria');
const libraryTable = document.querySelector('tbody');
const addBookButton = document.querySelector('.add-new');

//Elements inside modal
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const statusInput = document.querySelector('#status');
const deleteButton = document.querySelector('#delete');
const okButton = document.querySelector('#ok');
let currentObject;

//Creates library object
const library = new (class {
    books;
    sortOrder;
    sortType;

    constructor(){
        this.books = [];
        this.sortOrder = 'az';
        this.sortType = 'title';
    }
    //Method to add book to library
    addBook = function(book) {
        this.books.push(book);
    }

    //Method to delete book from library
    removeBook = function(book) {
        const index = this.books.indexOf(book);
        if (index > -1){
            this.books.splice(index, 1); //removes from library
        }
    }

    //Method to sort books in library
    sortBooks = function(order=this.sortOrder, parameter=this.sortType){
        if(parameter === 'pages'){
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
        } else {
            if(order === 'az'){
                this.books.sort((a,b)=>{
                    if(a[parameter].toLowerCase()<b[parameter].toLowerCase()){
                        return -1;
                    } else if (a[parameter].toLowerCase()>b[parameter].toLowerCase()){
                        return 1;
                    } else
                    return 0;
                })
            } else {
                this.books.sort((a,b)=>{
                    if(a[parameter].toLowerCase()<b[parameter].toLowerCase()){
                        return 1;
                    } else if (a[parameter].toLowerCase()>b[parameter].toLowerCase()){
                        return -1;
                    } else
                    return 0;
                })
            }
        }
    }

    //Method to update DOM 
    updateDOM = function() {
        libraryTable.innerHTML = '';
        this.books.forEach(book => {
            libraryTable.appendChild(book.row);
        });
    }

    //Method to sort books an update DOM
    sortUpdate = function() {
        library.sortBooks();
        library.updateDOM();
    }
    
})();


//Creates book constructor
class Book{
    constructor(title, author, pages, status){
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

        let self = this;
        this.editButton.addEventListener('click',()=>{
            titleInput.value = self.title;
            authorInput.value = self.author;
            pagesInput.value = self.pages;
            statusInput.value = self.status;
            currentObject = self;
            dialog.showModal();
        });
    }
    
    

    //Method to update row data
    update = ()=>{
        this.tdTitle.textContent = this.title;
        this.tdAuthor.textContent = this.author;
        this.tdPages.textContent = String(this.pages);
        this.tdStatus.textContent = this.status;
    }

};

//Sort order selection
//AZ sort:
azSort.addEventListener('click',()=>{
    azSort.classList.add('active');
    zaSort.classList.remove('active');
    library.sortOrder = 'az';
    library.sortUpdate();
});
//ZA sort:
zaSort.addEventListener('click',()=>{
    zaSort.classList.add('active');
    azSort.classList.remove('active');
    library.sortOrder = 'za';
    library.sortUpdate();
});

//Sort type:
sortCriteria.addEventListener('change',()=>{
    library.sortType = sortCriteria.value;
    library.sortUpdate();
});

//Addin new book:
addBookButton.addEventListener('click', ()=>{
    currentObject = new Book('','','','');
    library.addBook(currentObject);
    currentObject.editButton.dispatchEvent(new Event('click'));
});

//OK button:
okButton.addEventListener('click', ()=>{
    currentObject.title = titleInput.value;
    currentObject.author = authorInput.value;
    currentObject.pages = Number(pagesInput.value);
    currentObject.status = statusInput.value;
    dialog.close();
    currentObject.update();
    library.sortUpdate();
});

//Delete button:
deleteButton.addEventListener('click', ()=>{
    library.removeBook(currentObject);
    dialog.close();
    library.sortUpdate();
});

})();