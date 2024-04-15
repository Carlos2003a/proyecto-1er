let tareas = [];

window.onload = function() {
    // se recuperan las tareas del almacenamiento local del navegador 
    tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    renderizarTareas();
}

// función para agregar una nueva tarea
function agregarTarea() {
    // se obtiene el elemento de entrada de texto donde se ingresa la nueva tarea
    const tareaInput = document.getElementById("entradatarea"); 
    const textoTarea = tareaInput.value.trim();
    if (textoTarea !== "") {
        tareas.push({ texto: textoTarea, completada: false });
        guardarTareas();
        tareaInput.value = "";
        // se actualiza la interfaz de usuario para mostrar la nueva tarea
        renderizarTareas();
    }
}

function renderizarTareas() {
    // se obtiene el elemento de la lista de tareas
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";
    const tareasFiltradas = filtrarTareasPorEstado(tareas);
    tareasFiltradas.forEach(tarea => {
        const li = document.createElement("li");
        // se establece el contenido HTML del elemento de lista para mostrar la tarea y botones de acción
        li.innerHTML = `<span>${tarea.texto}</span> <button onclick="completarTarea(${tareas.indexOf(tarea)})">Completar</button> <button onclick="editarTarea(${tareas.indexOf(tarea)})">Editar</button> <button onclick="eliminarTarea(${tareas.indexOf(tarea)})">Eliminar</button>`;
        if (tarea.completada) {
            li.classList.add("completada");
        }
        // se agregan una clase para animaciones de entrada a la lista de tareas
        li.classList.add("tarea-entrar");
        listaTareas.appendChild(li);
        setTimeout(() => {
            li.classList.remove("tarea-entrar");
            li.classList.add("tarea-entrar-activa");
        }, 0);
    });
}

// función para marcar una tarea como completada o no completada
function completarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada;
    // se guarda el arreglo actualizado en el almacenamiento local del navegador
    guardarTareas();
    renderizarTareas();
}

// función para editar el texto de una tarea
function editarTarea(indice) {
    const nuevoTexto = prompt("Editar tarea", tareas[indice].texto);
    if (nuevoTexto !== null) {
        // se actualiza el texto de la tarea en el arreglo
        tareas[indice].texto = nuevoTexto.trim();
        guardarTareas();
        renderizarTareas();
    }
}

// función para eliminar una tarea
function eliminarTarea(indice) {
    const tarea = document.querySelectorAll("li")[indice];
    // se aplica una animación de salida a la tarea
    tarea.classList.add("tarea-salir");
    setTimeout(() => {
        tareas.splice(indice, 1);
        guardarTareas();
        renderizarTareas();
    }, 300); 
}

// función para guardar las tareas en el almacenamiento local del navegador
function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

// función para filtrar las tareas según su estado
function filtrarTareasPorEstado(tareas) {
    const filtro = document.querySelector('input[name="filtro"]:checked').value;
    if (filtro === "todas") {
        return tareas;
    } else if (filtro === "activas") {
        return tareas.filter(tarea => !tarea.completada);
    } else if (filtro === "completadas") {
        return tareas.filter(tarea => tarea.completada);
    }
}
