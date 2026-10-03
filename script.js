
const form = document.getElementById("note-form");
const noteInput = document.getElementById("note-input");
const category = document.getElementById("note-category");
const notesList = document.getElementById("notes-list");
const noteCount = document.getElementById("note-count");
const errorMessage = document.getElementById("error-message");
const searchInput = document.getElementById("search-input");

let notes = JSON.parse(localStorage.getItem("notes"));


function displayNotes() {
  notesList.innerHTML = "";

  const search = searchInput.value.toLowerCase();

  const filteredNotes = notes.filter(function(note) {
    return note.text.toLowerCase().includes(search);
  });

  if (filteredNotes.length === 0 && search !== "") {
    notesList.textContent = "No notes match your search.";
  }

  filteredNotes.forEach(function(note) {
    const li = document.createElement("li");
    li.classList.add("note", note.category);

    const text = document.createElement("p");
    text.textContent = note.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function() {
      notes = notes.filter(function(n) {
        return n.id !== note.id;
      });

      saveNotes();
      displayNotes();
    });

    li.appendChild(text);
    li.appendChild(deleteBtn);
    notesList.appendChild(li);
  });

  
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}


form.addEventListener("submit", function(event) {
  event.preventDefault();

  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const newNote = {
    id: Date.now(),
    text: text,
    category: category.value
  };

  notes.push(newNote);
  saveNotes();

  noteInput.value = "";
  displayNotes();
});


searchInput.addEventListener("input", displayNotes);


displayNotes()