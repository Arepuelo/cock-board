const add_note = document.getElementById("add-note")
const board = document.getElementById("board")

add_note.addEventListener("click", () => {
    const note = document.createElement("div")
    note.textContent = "new note"
    note.classList.add("note")
    board.appendChild(note)
})