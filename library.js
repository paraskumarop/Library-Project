console.log("library");
showNotes();
//CREATE A FUNCTION
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}
//Display Object
function Display() {
    
}
//add function to the Prototype of Display
Display.prototype.add = function (book) {
    console.log("adding to UI");
    let notes=localStorage.getItem('notes');
    // let tableBody = document.getElementById('tableBody');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.push(book);
    localStorage.setItem('notes',JSON.stringify(notesObj))
    console.log(notesObj);
    showNotes();
}
function showNotes(){
    let notes=localStorage.getItem('notes');
    let tableBody = document.getElementById('tableBody');
    if(notes==null){
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html='';
    console.log(notesObj);
    notesObj.forEach(function(element,index) {
        html += `
        <tr>
        <td>${element.name}</td>
        <td>${element.author}</td>
        <td>${element.type}</td>
        <td><button type="button" onClick="deleteNotes(this.id)"class="btn btn-danger" id=${index}>Delete</button></td>

        </tr>
        `
    });
    if(notesObj.length != ""){
        tableBody.innerHTML=html;
    }
    else{
        tableBody.innerHTML=`Not added Yet `
    }
}

                //clear function to the PRototype of Display
Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

            //validate Function to the prototype of display
Display.prototype.validate = function (book) {
    if (book.name.length <= 2 || book.author.length <= 1) {
        return false;
    }
    else {
        return true;
    }
}

             //show function to the prototype of display
Display.prototype.show = function (type, displayMessage) {
    let msg = document.getElementById('message');
    msg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                 <strong>Message: </strong>${displayMessage} You should check in on some of those fields below.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`
    setTimeout(() => {
        msg.innerHTML = '';
    }, 2000);
}

let libraryForm = document.getElementById('libraryForm');

                    //adding Event Listener to the Library Form
libraryForm.addEventListener('submit', libraryFormSubmit);
//creating a Function for the ease we can use arrow function instead of this
function libraryFormSubmit(e) {
    console.log("you have submitted a form");
    let name = document.getElementById('bookname').value;
    let author = document.getElementById('author').value;
    let type;


    let Self_Help = document.getElementById('Self_Help');
    let Programming = document.getElementById('Programming');
    if (Self_Help.checked) {
        type = Self_Help.value;
    }
    else if (Programming.checked) {
        type = Programming.value;
    }
    //create an Object of Book Function
    let book = new Book(name, author, type);
    console.log(book);
    //Create an Object of Display Function
    let display = new Display();
    //logic Goes Here
    if (display.validate(book)) {
        display.add(book);  //if validate function returns true then run add function 
        display.clear();
        display.show('success', "Your book has been successfully added!");
    }
    else {
        display.show('danger', "Sorry You can not Add this Book!");
    }


    let storeNAme=localStorage.getItem('')
    e.preventDefault();
}
//Store the data in local storage
//give an option to delete the books
//add a scrollBar to the page
function deleteNotes(index){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    showNotes();
}