import { useState, useEffect } from "react";

function App() {
    const [task, setInput] = useState("");   // para controlar el input
    const [tasks, setTodoList] = useState([]); // para la lista de tareas

    // Añadir tareas
    const addTaskApi = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/josezl', {
                method: "POST",
                body: JSON.stringify({
                    label: task,
                    is_done: false
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                getApi();
            const data = await response.json();
        } 
        catch (error) {
            alert("Error añadiendo tarea")
        }
    }

    // Borrar tareas
    const deleteTaskApi = async (id) => {
        try {
            const response = await fetch ('https://playground.4geeks.com/todo/todos/' + id, {
                method: "DELETE"
            })
                getApi();
        } 
        catch (error) {
            alert("Error borrando tarea")
        }
    }

    // Modificar tareas
    const updateTaskApi = async (id) => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/todos/' + id, {
                method: "PUT",
                body: JSON.stringify({
                    label: task,
                    is_done: true
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json();
            getApi();
            console.log(data)
        } 
        catch (error) {
            alert("Error actualizando tarea")
        }
    }

    // Funciones
    const getApi = async () => {
        try {
            const response = await fetch('https://playground.4geeks.com/todo/users/josezl') 
            if (!response.ok) {
                createUser()
            }
            const apiData = await response.json();
            console.log(response);
            console.log(apiData);
            setTodoList(apiData.todos);
        } 
        catch (error) {
            alert("Error accediendo a la API")
        }
    }

    // Contenedor de la App
    return (
        <div className="container">
        <h1>Agenda de Trabajo</h1>
        <input
            type="text"
            placeholder="Escribe una tarea y presiona Enter..."
            value={task}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    addTaskApi();
                }   
            }}
        />

        {tasks.length === 0 ? (
            <p className="empty-message animate__animated animate__fadeIn">
            No hay tareas pendientes
            </p>
        ) : (
            <ul>
            {tasks.map((task) => (
                    <li key={task.id} className="animate__animated animate__fadeInUp">
                <>
                    <span>{task.label}</span>
                    <div>
                        <button onClick={() => updateTaskApi(task.id)} title="Editar">
                            <i className="fas fa-pen"></i>
                        </button>
                        <button onClick={() => deleteTaskApi(task.id)} title="Eliminar">
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                </>
            </li>
            ))}
            </ul>
        )}
    </div>
    );
}

export default App;