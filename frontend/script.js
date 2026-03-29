const add_note = document.getElementById("add-note")
const viewport = document.getElementById("viewport")
const canvas = document.getElementById("canvas")

let mouse_click = false;
let current_note = null;
let note_counter = 0;

let x_position = 0;
let y_position = 0;
let zoom = 1;


viewport.addEventListener("mousedown", () => {mouse_click = true})
viewport.addEventListener("mouseup", () => {
    mouse_click = false;
    current_note = null
})
viewport.addEventListener("mousemove", (e) => {
    if (mouse_click) {
        x_position += e.movementX;
        y_position += e.movementY;
        canvas.style.transform = `translate(${x_position}px, ${y_position}px) scale(${zoom})`;
    }
    else if (current_note != null) {
        let x = parseFloat(current_note.dataset.x);
        let y = parseFloat(current_note.dataset.y);
        x += e.movementX / zoom;
        y += e.movementY / zoom;
        current_note.dataset.x = x;
        current_note.dataset.y = y;
        current_note.style.left = `${x}px`;
        current_note.style.top = `${y}px`;
    }
})
viewport.addEventListener("wheel", (e) => {
    zoom *= Math.exp(e.deltaY/10000);
    canvas.style.transform = `translate(${x_position}px, ${y_position}px) scale(${zoom})`;
})

add_note.addEventListener("click", () => {
    const note = document.createElement("div")
    note.textContent = "new note"
    note.classList.add("note")
    canvas.appendChild(note)
    note_counter++;
    
    note.dataset.x = 10 * note_counter;
    note.dataset.y = 10 * note_counter;
    note.style.left = `${note.dataset.x}px`;
    note.style.top = `${note.dataset.y}px`;
    note.addEventListener("mousedown", (e) => {
        current_note = note;
        e.stopPropagation()
    })
})