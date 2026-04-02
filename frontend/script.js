const add_note = document.getElementById("add-note")
const viewport = document.getElementById("viewport")
const canvas = document.getElementById("canvas")

let mouse_click = false;
let dragged_note = null;
let selected_note = null;
let note_counter = 0;

let x_position = 0;
let y_position = 0;
let zoom = 1;


viewport.addEventListener("mousedown", () => {
    if (selected_note != null) {
        selected_note.toolbarRef.classList.remove("active")
        selected_note = null
    }
    mouse_click = true
})

viewport.addEventListener("mouseup", () => {
    mouse_click = false;
    dragged_note = null
})

viewport.addEventListener("mousemove", (e) => {
    if (mouse_click) {
        x_position += e.movementX;
        y_position += e.movementY;
        canvas.style.transform = `translate(${x_position}px, ${y_position}px) scale(${zoom})`;
    }
    else if (dragged_note != null) {
        let x = parseFloat(dragged_note.dataset.x);
        let y = parseFloat(dragged_note.dataset.y);
        x += e.movementX / zoom;
        y += e.movementY / zoom;
        dragged_note.dataset.x = x;
        dragged_note.dataset.y = y;
        dragged_note.style.left = `${x}px`;
        dragged_note.style.top = `${y}px`;
    }
})

viewport.addEventListener("wheel", (e) => {
    zoom *= Math.exp(e.deltaY/10000);
    canvas.style.transform = `translate(${x_position}px, ${y_position}px) scale(${zoom})`;
})

add_note.addEventListener("click", () => {
    note_counter++;

    const note_container = document.createElement("div")
    note_container.classList.add("note_container")

    const note = document.createElement("div")
    note.classList.add("note")

    canvas.appendChild(note_container)
    note_container.appendChild(note)

    const text_note = document.createElement("textarea")
    note.appendChild(text_note)

    const toolbar = document.createElement("div")
    toolbar.classList.add("toolbar")
    note_container.toolbarRef = toolbar
    note_container.appendChild(toolbar)
    
    const color_input = document.createElement("input")
    color_input.type = "color"
    color_input.value = "#F0F8FF"
    toolbar.appendChild(color_input)
    toolbar.addEventListener("input", () => {
        note.style.backgroundColor =`${color_input.value}`
    })
    
    const drag_handle = document.createElement("div")
    drag_handle.classList.add("drag_handle")
    drag_handle.textContent = "⋮⋮⋮⋮⋮⋮⋮⋮"
    drag_handle.addEventListener("mousedown", () => {dragged_note = note_container;})
    toolbar.appendChild(drag_handle)
    
    note_container.dataset.x = 800 + 10 * note_counter;
    note_container.dataset.y = 150 + 10 * note_counter;
    note_container.style.left = `${note_container.dataset.x}px`;
    note_container.style.top = `${note_container.dataset.y}px`;

    note_container.addEventListener("mousedown", (e) => {
        if (selected_note != null) {selected_note.toolbarRef.classList.remove("active")}
        toolbar.classList.add("active")
        selected_note = note_container;
        e.stopPropagation()
    })
})

