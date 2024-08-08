document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('note-form');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const notesList = document.getElementById('notes-list');
    
    let allNotes = getNotes();
    updateNotesList();

    noteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        addNote();
    });

    function addNote() {
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        if (title.length > 0 && content.length > 0) {
            const noteObject = {
                title: title,
                content: content
            };
            allNotes.push(noteObject);
            updateNotesList();
            saveNotes();
            noteTitle.value = "";
            noteContent.value = "";
        }
    }

    function updateNotesList() {
        notesList.innerHTML = "";
        allNotes.forEach((note, noteIndex) => {
            const noteItem = createNoteItem(note, noteIndex);
            notesList.append(noteItem);
        });
    }

    function createNoteItem(note, noteIndex) {
        const noteLI = document.createElement('li');
        noteLI.innerHTML = `
            <a href="#" contenteditable>
                <h2>${note.title}</h2>
                <p>${note.content}</p>
            </a>
            <button class="delete-button">&times;</button>
        `;
        const deleteButton = noteLI.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            deleteNoteItem(noteIndex);
        });
        const noteLink = noteLI.querySelector('a');
        noteLink.addEventListener('keyup', () => {
            updateNoteItem(noteIndex, noteLink);
        });
        return noteLI;
    }

    function deleteNoteItem(noteIndex) {
        allNotes = allNotes.filter((_, index) => index !== noteIndex);
        saveNotes();
        updateNotesList();
    }

    function updateNoteItem(noteIndex, noteLink) {
        const updatedTitle = noteLink.querySelector('h2').innerText;
        const updatedContent = noteLink.querySelector('p').innerText;
        allNotes[noteIndex] = {
            title: updatedTitle,
            content: updatedContent
        };
        saveNotes();
    }

    function saveNotes() {
        const notesJson = JSON.stringify(allNotes);
        localStorage.setItem('notes', notesJson);
    }

    function getNotes() {
        const notes = localStorage.getItem('notes') || '[]';
        return JSON.parse(notes);
    }
});

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.querySelector(".content").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.querySelector(".content").style.marginLeft = "0";
}
