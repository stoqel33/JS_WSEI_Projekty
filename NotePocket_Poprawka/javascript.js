noteTitle = document.getElementById("noteTitle");
note = document.getElementById("note");
let number = 1;
let num = 1;
// Ładowanie danych z localstorage
window.onload = function loadNoteF(){
    
    for (let i = 1; i <= 6; i++)
    {
        let ndata = JSON.parse(localStorage.getItem(i));
    
        document.getElementById('T' + i).innerHTML = ndata['Title'];
        document.getElementById('Nd' + i).innerHTML = ndata['Note'];
        number = ndata['ID'];
    }
}
// Dodawanie notatki
function addNote(){
    document.getElementById('overlay').style.display='block';
    document.getElementById('inputBox').style.display='block';
}

function closeOverlay(){
    document.getElementById('overlay').style.display='none';
    document.getElementById('inputBox').style.display='none';
}
// Usuwanie notatek
function removeNote(){

    document.getElementById('T' + num).innerHTML = "";
    document.getElementById('Nd' + num).innerHTML = "";
    localStorage.removeItem(num);
    sortNotes()
}
// Edytowanie notatki
function editNote(idnum)
{
    num = idnum
    document.getElementById('overlay').style.display='block';
    document.getElementById('inputBox').style.display='block';
    let ndata = JSON.parse(localStorage.getItem(idnum));
    document.getElementById('noteTitle').value = ndata['Title'];
    document.getElementById('note').innerHTML = ndata['Note'];
}
// Zapisanie zmian w notatce
function saveChanges(){

    localStorage.removeItem(num);
    let ndata = { "Title" : noteTitle.value,"Note" : note.value, "ID" : num};
    let noteData = JSON.stringify(ndata);
    localStorage.setItem(num, noteData);
    
    document.getElementById('T' + num).innerHTML = noteTitle.value;
    document.getElementById('Nd' + num).innerHTML = note.value;
    location.reload();
}

// Dodanie notatki do Local Storage
function addNoteF(){
    
    let ndata = { "Title" : noteTitle.value,"Note" : note.value, "ID" : number};
    let noteData = JSON.stringify(ndata);
    localStorage.setItem(number, noteData);
    
    document.getElementById('T' + number).innerHTML = noteTitle.value;
    document.getElementById('Nd' + number).innerHTML = note.value;
    
    number += 1;
    if (number > 12) { number = 12};
}

// Sortowanie notatek
function sortNotes(){
    
    location.reload();
    for (let n = 1; n < 6; n++)
    {
        let ndata = JSON.parse(localStorage.getItem(n));
        
        if (n > num)
        {
            ndata = { "Title" : ndata['Title'],"Note" : ndata['Note'], "ID" : n - 1}
            let noteData = JSON.stringify(ndata);
            localStorage.removeItem(n);
            localStorage.setItem(n -1 , noteData);
            
        }
    }
}