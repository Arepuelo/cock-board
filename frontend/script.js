const add_note = document.getElementById("add-note")
const viewport = document.getElementById("viewport")
const canvas = document.getElementById("canvas")

let x_position = 0;
let y_position = 0;
let zoom = 1;

let mouse_click = false;

viewport.addEventListener("mousedown", () => {mouse_click = true})
viewport.addEventListener("mouseup", () => {mouse_click = false})
viewport.addEventListener("mousemove", (e) => {
    if (mouse_click) {
        x_position += e.movementX;
        y_position += e.movementY;
        canvas.style.transform = `translate(${x_position}px, ${y_position}px) scale(${zoom})`;
    }
})

add_note.addEventListener("click", () => {
    const note = document.createElement("div")
    note.textContent = "new note"
    note.classList.add("note")
    canvas.appendChild(note)
})